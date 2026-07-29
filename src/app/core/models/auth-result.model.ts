/**
 * Result of an AuthService operation. Components branch on `success` and
 * only ever see `message`, never a raw Supabase `AuthError`.
 */
export type AuthResult =
  | { readonly success: true; readonly requiresEmailConfirmation?: boolean }
  | { readonly success: false; readonly message: string };
