import { Injectable, computed, signal } from '@angular/core';

import { AuthResult } from '../models/auth-result.model';
import { AuthUser } from '../models/auth-user.model';

const UNAVAILABLE: AuthResult = { success: false, message: 'Sign-in is temporarily unavailable.' };

/**
 * App-wide auth state. No authentication provider is wired in yet, so every
 * visitor is unauthenticated and protected routes stay locked.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly currentUser = signal<AuthUser | null>(null);
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  whenReady(): Promise<boolean> {
    return Promise.resolve(this.isAuthenticated());
  }

  getAccessToken(): string | null {
    return null;
  }

  async signUp(_email: string, _password: string, _fullName: string): Promise<AuthResult> {
    return UNAVAILABLE;
  }

  async signIn(_email: string, _password: string): Promise<AuthResult> {
    return UNAVAILABLE;
  }

  async signInWithGoogle(_returnUrl?: string): Promise<AuthResult> {
    return UNAVAILABLE;
  }

  async signOut(): Promise<void> {
    this.currentUser.set(null);
  }
}
