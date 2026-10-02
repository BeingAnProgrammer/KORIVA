import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';

import { environment } from '../../../environments/environment';
import { AuthResult } from '../models/auth-result.model';
import { AuthUser } from '../models/auth-user.model';

/**
 * Firebase-backed auth state. Firebase is the source of truth: the signals
 * below only mirror `auth.currentUser`. Firebase Auth relies on browser
 * storage, so it is initialized in the browser only — during SSR every
 * visitor reads as signed out and no Firebase API runs.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private readonly auth = isPlatformBrowser(inject(PLATFORM_ID)) ? getAuth(initializeApp(environment.firebase)) : null;

  readonly currentUser = signal<AuthUser | null>(null);
  /** Only verified accounts count as signed in to the app. */
  readonly isAuthenticated = computed(() => this.currentUser()?.emailVerified === true);
  /** Signed in with Firebase, but the email address is not verified yet. */
  readonly needsVerification = computed(() => this.currentUser()?.emailVerified === false);

  constructor() {
    if (this.auth) {
      onAuthStateChanged(this.auth, () => this.sync());
    }
  }

  /** Resolves once Firebase has restored any persisted session. */
  async whenReady(): Promise<boolean> {
    if (!this.auth) {
      return false;
    }
    await this.auth.authStateReady();
    return this.auth.currentUser?.emailVerified === true;
  }

  async getIdToken(): Promise<string | null> {
    return (await this.auth?.currentUser?.getIdToken()) ?? null;
  }

  signUp(email: string, password: string, fullName: string): Promise<AuthResult> {
    return this.run(async (auth) => {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: fullName });
      await sendEmailVerification(user);
    });
  }

  signIn(email: string, password: string): Promise<AuthResult> {
    return this.run((auth) => signInWithEmailAndPassword(auth, email, password));
  }

  signInWithGoogle(): Promise<AuthResult> {
    return this.run((auth) => signInWithPopup(auth, new GoogleAuthProvider()));
  }

  resendVerificationEmail(): Promise<AuthResult> {
    return this.run((auth) => sendEmailVerification(this.requireUser(auth)));
  }

  /** Reloads the Firebase user so `emailVerified` reflects a link clicked in another tab. */
  checkEmailVerified(): Promise<AuthResult> {
    return this.run(async (auth) => {
      const user = this.requireUser(auth);
      await user.reload();
      if (!user.emailVerified) {
        throw { code: 'auth/unverified-email' };
      }
      // Refresh the ID token so its `email_verified` claim is current too.
      await user.getIdToken(true);
    });
  }

  /** Succeeds for unknown emails too, so the form never reveals which accounts exist. */
  sendPasswordReset(email: string): Promise<AuthResult> {
    return this.run((auth) =>
      sendPasswordResetEmail(auth, email).catch((error) => {
        if (error?.code !== 'auth/user-not-found') {
          throw error;
        }
      })
    );
  }

  async signOut(): Promise<void> {
    if (this.auth) {
      await signOut(this.auth).catch(() => undefined);
    }
    this.currentUser.set(null);
    await this.router.navigateByUrl('/');
  }

  private async run(action: (auth: Auth) => Promise<unknown>): Promise<AuthResult> {
    if (!this.auth) {
      return { success: false, message: authErrorMessage() };
    }
    try {
      await action(this.auth);
      return { success: true };
    } catch (error) {
      return { success: false, message: authErrorMessage((error as { code?: string }).code) };
    } finally {
      // Firebase doesn't emit auth-state events for profile updates or reloads.
      this.sync();
    }
  }

  private requireUser(auth: Auth) {
    if (!auth.currentUser) {
      throw { code: 'auth/user-token-expired' };
    }
    return auth.currentUser;
  }

  private sync(): void {
    const user = this.auth?.currentUser;
    this.currentUser.set(
      user ? { id: user.uid, email: user.email, fullName: user.displayName, emailVerified: user.emailVerified } : null
    );
  }
}

/** User-facing copy for Firebase error codes. Empty string = user cancelled, show nothing. */
export function authErrorMessage(code?: string): string {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'The email or password you entered is incorrect.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Please choose a stronger password.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/unverified-email':
      return "Your email isn't verified yet. Click the link in your inbox, then try again.";
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/too-many-requests':
      return 'Too many attempts — please wait a moment and try again.';
    case 'auth/network-request-failed':
      return 'Network error — check your connection and try again.';
    case 'auth/user-token-expired':
    case 'auth/requires-recent-login':
      return 'Your session has expired. Please sign in again.';
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return '';
    case 'auth/popup-blocked':
      return 'Your browser blocked the Google sign-in window. Allow pop-ups and try again.';
    case 'auth/account-exists-with-different-credential':
      return 'An account with this email already exists. Sign in with your password instead.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not available right now. Please try again later.';
    default:
      return 'Something went wrong. Please try again.';
  }
}
