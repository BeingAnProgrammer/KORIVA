export interface Environment {
  readonly production: boolean;
  readonly supabaseUrl: string;
  readonly supabaseAnonKey: string;
  /** Base URL of a future backend (e.g. FastAPI) that should receive the Supabase JWT. */
  readonly apiUrl: string;
}
