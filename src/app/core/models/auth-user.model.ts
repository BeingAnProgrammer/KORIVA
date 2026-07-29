import { User } from '@supabase/supabase-js';

/**
 * Clean, app-facing shape for the signed-in user. Every service/component
 * depends on this — never on Supabase's raw `User` — so a future `profiles`
 * table (richer fields, `preferences`, etc.) can be joined in behind
 * `AuthService` without touching any consumer of this model.
 */
export interface AuthUser {
  readonly id: string;
  readonly email: string | null;
  readonly fullName: string | null;
  readonly avatarUrl: string | null;
  readonly provider: string;
  readonly createdAt: string;
  readonly emailConfirmedAt: string | null;
}

export function toAuthUser(user: User): AuthUser {
  const metadata = user.user_metadata ?? {};

  return {
    id: user.id,
    email: user.email ?? null,
    fullName: metadata['full_name'] ?? metadata['name'] ?? null,
    avatarUrl: metadata['avatar_url'] ?? metadata['picture'] ?? null,
    provider: user.app_metadata?.provider ?? 'email',
    createdAt: user.created_at,
    emailConfirmedAt: user.email_confirmed_at ?? null
  };
}
