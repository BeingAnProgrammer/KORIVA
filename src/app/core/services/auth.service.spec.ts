import { authErrorMessage } from './auth.service';

describe('authErrorMessage', () => {
  it('maps common Firebase codes to friendly copy', () => {
    expect(authErrorMessage('auth/invalid-credential')).toBe('The email or password you entered is incorrect.');
    expect(authErrorMessage('auth/email-already-in-use')).toBe('An account with this email already exists.');
    expect(authErrorMessage('auth/weak-password')).toBe('Please choose a stronger password.');
    expect(authErrorMessage('auth/invalid-email')).toBe('Please enter a valid email address.');
  });

  it('stays silent when the user closes the Google popup', () => {
    expect(authErrorMessage('auth/popup-closed-by-user')).toBe('');
  });

  it('falls back to a generic message for unknown codes', () => {
    expect(authErrorMessage('auth/something-new')).toBe('Something went wrong. Please try again.');
    expect(authErrorMessage()).toBe('Something went wrong. Please try again.');
  });
});
