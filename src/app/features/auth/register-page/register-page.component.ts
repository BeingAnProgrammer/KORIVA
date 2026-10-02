import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { LogoMarkComponent } from '../../../shared/ui/logo-mark/logo-mark.component';

function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password && confirmPassword && password !== confirmPassword ? { passwordsMismatch: true } : null;
}

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink, LogoMarkComponent, IconComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent {
  private readonly fb = inject(FormBuilder);
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly isSubmitting = signal(false);
  protected readonly isGoogleSubmitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly isCheckingVerification = signal(false);
  protected readonly isResending = signal(false);
  protected readonly infoMessage = signal<string | null>(null);
  protected readonly requiresEmailConfirmation = this.auth.needsVerification;
  protected readonly showPassword = signal(false);
  protected readonly showConfirmPassword = signal(false);

  protected readonly form = this.fb.nonNullable.group(
    {
      fullName: ['', [Validators.required, Validators.pattern(/\S/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    },
    { validators: passwordsMatchValidator }
  );

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const { fullName, email, password } = this.form.getRawValue();
    const result = await this.auth.signUp(email.trim(), password, fullName.trim());

    this.isSubmitting.set(false);

    if (!result.success) {
      this.errorMessage.set(result.message);
    }
  }

  protected async onGoogleSignIn(): Promise<void> {
    if (this.isGoogleSubmitting()) {
      return;
    }

    this.isGoogleSubmitting.set(true);
    this.errorMessage.set(null);

    const result = await this.auth.signInWithGoogle();

    this.isGoogleSubmitting.set(false);

    if (!result.success) {
      this.errorMessage.set(result.message || null);
      return;
    }

    await this.router.navigateByUrl(this.returnUrl());
  }

  protected async onCheckVerification(): Promise<void> {
    if (this.isCheckingVerification()) {
      return;
    }

    this.isCheckingVerification.set(true);
    this.errorMessage.set(null);
    this.infoMessage.set(null);

    const result = await this.auth.checkEmailVerified();

    this.isCheckingVerification.set(false);

    if (!result.success) {
      this.errorMessage.set(result.message);
      return;
    }

    await this.router.navigateByUrl(this.returnUrl());
  }

  protected async onResendVerification(): Promise<void> {
    if (this.isResending()) {
      return;
    }

    this.isResending.set(true);
    this.errorMessage.set(null);
    this.infoMessage.set(null);

    const result = await this.auth.resendVerificationEmail();

    this.isResending.set(false);

    if (result.success) {
      this.infoMessage.set('A new verification link is on its way.');
    } else {
      this.errorMessage.set(result.message);
    }
  }

  protected togglePasswordVisibility(): void {
    this.showPassword.update((show) => !show);
  }

  protected toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.update((show) => !show);
  }

  protected fieldError(name: 'fullName' | 'email' | 'password' | 'confirmPassword'): string | null {
    const control = this.form.get(name);
    if (!control || !control.touched || control.valid) {
      return null;
    }

    if (control.hasError('required') || control.hasError('pattern')) {
      return 'This field is required.';
    }
    if (control.hasError('email')) {
      return 'Enter a valid email address.';
    }
    if (control.hasError('minlength')) {
      return `Must be at least ${control.getError('minlength').requiredLength} characters.`;
    }

    return null;
  }

  private returnUrl(): string {
    return this.route.snapshot.queryParamMap.get('returnUrl') || '/app/home';
  }
}
