/**
 * Clean, app-facing shape for the signed-in user. Every service/component
 * depends on this — never on Firebase's raw `User` — so richer profile
 * fields can be added behind `AuthService` without touching consumers.
 */
export interface AuthUser {
  readonly id: string;
  readonly email: string | null;
  readonly fullName: string | null;
  readonly emailVerified: boolean;
}
