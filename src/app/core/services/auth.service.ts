import { isPlatformBrowser } from '@angular/common';
import { Injectable, OnDestroy, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthError, SupabaseClient, Session, createClient } from '@supabase/supabase-js';
import { filter, firstValueFrom, map, take } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResult } from '../models/auth-result.model';
import { AuthUser, toAuthUser } from '../models/auth-user.model';

/**
 * Centralized Supabase session/auth state, mirroring `ThemeService`'s
 * SSR-safe signal pattern: state lives in signals, side effects (restoring
 * the session, listening for auth changes) are confined to the browser.
 */
@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly router = inject(Router);

  // Lazy: only constructed on first real use (browser-only code paths), so an
  // unconfigured placeholder `environment.supabaseUrl` never breaks SSR
  // prerendering of public routes that merely read auth *signals*.
  private supabaseClient: SupabaseClient | null = null;
  private get supabase(): SupabaseClient {
    return (this.supabaseClient ??= createClient(environment.supabaseUrl, environment.supabaseAnonKey));
  }

  readonly session = signal<Session | null>(null);
  readonly isLoading = signal<boolean>(this.isBrowser);

  // Must be initialized after `session`/`isLoading` above — its callback can fire
  // as soon as it's registered and writes to both signals.
  private readonly authSubscription = this.isBrowser ? this.subscribeToAuthChanges() : null;

  readonly user = computed(() => this.session()?.user ?? null);
  readonly currentUser = computed<AuthUser | null>(() => {
    const user = this.user();
    return user ? toAuthUser(user) : null;
  });
  readonly isAuthenticated = computed(() => this.session() !== null);

  private readonly isLoading$ = toObservable(this.isLoading);

  constructor() {
    if (this.isBrowser) {
      this.supabase.auth.getSession().then(({ data }) => {
        this.session.set(data.session);
        this.isLoading.set(false);
      });
    }
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  /** Resolves once the initial session restore completes, then reflects live auth state. */
  whenReady(): Promise<boolean> {
    return firstValueFrom(
      this.isLoading$.pipe(
        filter((loading) => !loading),
        take(1),
        map(() => this.isAuthenticated())
      )
    );
  }

  getAccessToken(): string | null {
    return this.session()?.access_token ?? null;
  }

  async signUp(email: string, password: string, fullName: string): Promise<AuthResult> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: this.isBrowser ? `${window.location.origin}/login` : undefined
      }
    });

    if (error) {
      return { success: false, message: this.mapAuthError(error) };
    }

    return { success: true, requiresEmailConfirmation: data.session === null };
  }

  async signIn(email: string, password: string): Promise<AuthResult> {
    const { error } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { success: false, message: this.mapAuthError(error) };
    }

    return { success: true };
  }

  async signInWithGoogle(returnUrl?: string): Promise<AuthResult> {
    if (!this.isBrowser) {
      return { success: false, message: 'Google sign-in is only available in the browser.' };
    }

    const redirectTo = `${window.location.origin}/login${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`;
    const { error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo }
    });

    if (error) {
      return { success: false, message: this.mapAuthError(error) };
    }

    return { success: true };
  }

  async signOut(): Promise<void> {
    try {
      await this.supabase.auth.signOut();
    } catch {
      // supabase-js clears local session state before attempting the network
      // revoke, so a network failure here shouldn't block navigation. Force
      // the signal clear regardless, so the UI reflects "logged out" even in
      // the unlikely case the auth-state-change event is delayed or missed.
    } finally {
      this.session.set(null);
    }

    await this.router.navigateByUrl('/');
  }

  private subscribeToAuthChanges() {
    const {
      data: { subscription }
    } = this.supabase.auth.onAuthStateChange((_event, session) => {
      this.session.set(session);
      this.isLoading.set(false);
    });

    return subscription;
  }

  private mapAuthError(error: AuthError): string {
    switch (error.code) {
      case 'invalid_credentials':
        return 'The email or password you entered is incorrect.';
      case 'user_already_exists':
      case 'email_exists':
        return 'An account with this email already exists.';
      case 'email_not_confirmed':
        return 'Please confirm your email before logging in.';
      case 'weak_password':
        return 'Please choose a stronger password.';
      case 'email_address_invalid':
        return 'Please enter a valid email address.';
      case 'over_email_send_rate_limit':
      case 'over_request_rate_limit':
        return 'Too many attempts — please wait a moment and try again.';
      case 'provider_disabled':
        return 'Google sign-in is not available right now. Please try again later.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }
}
