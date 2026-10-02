/**
 * Result of an AuthService operation. Components branch on `success` and
 * only ever see `message`, never a raw Firebase error.
 */
export type AuthResult = { readonly success: true } | { readonly success: false; readonly message: string };
