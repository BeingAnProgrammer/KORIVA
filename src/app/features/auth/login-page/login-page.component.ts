import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { ButtonDirective } from '../../../shared/directives/button.directive';
import { LogoMarkComponent } from '../../../shared/ui/logo-mark/logo-mark.component';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink, LogoMarkComponent, ButtonDirective],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly isSubmitting = signal(false);
  protected readonly isGoogleSubmitting = signal(false);
  protected readonly errorMessage = signal<string | null>(this.readUrlError());

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const { email, password } = this.form.getRawValue();
    const result = await this.auth.signIn(email.trim(), password);

    this.isSubmitting.set(false);

    if (!result.success) {
      this.errorMessage.set(result.message);
      return;
    }

    await this.router.navigateByUrl(this.returnUrl());
  }

  protected async onGoogleSignIn(): Promise<void> {
    if (this.isGoogleSubmitting()) {
      return;
    }

    this.isGoogleSubmitting.set(true);
    this.errorMessage.set(null);

    const result = await this.auth.signInWithGoogle(this.returnUrl());

    if (!result.success) {
      this.isGoogleSubmitting.set(false);
      this.errorMessage.set(result.message);
    }
  }

  protected fieldError(name: 'email' | 'password'): string | null {
    const control = this.form.get(name);
    if (!control || !control.touched || control.valid) {
      return null;
    }

    if (control.hasError('required')) {
      return 'This field is required.';
    }
    if (control.hasError('email')) {
      return 'Enter a valid email address.';
    }

    return null;
  }

  private returnUrl(): string {
    return this.route.snapshot.queryParamMap.get('returnUrl') || '/app/dashboard';
  }

  /** Supabase appends `error_description` to the redirect URL when an email/OAuth link fails. */
  private readUrlError(): string | null {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const hasError = hash.has('error') || this.route.snapshot.queryParamMap.has('error');
    return hasError ? 'That link is invalid or has expired. Please try again.' : null;
  }
}
