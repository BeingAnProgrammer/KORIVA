export interface Environment {
  readonly production: boolean;
  /** Base URL of a future backend (e.g. FastAPI) that should receive the auth token. */
  readonly apiUrl: string;
}
