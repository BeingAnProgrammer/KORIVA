export interface Environment {
  readonly production: boolean;
  /** Firebase Web App config — public client identifiers, not secrets. */
  readonly firebase: {
    readonly apiKey: string;
    readonly authDomain: string;
    readonly projectId: string;
    readonly appId: string;
  };
  /** Base URL of a future backend (e.g. FastAPI) that should receive the Firebase ID token. */
  readonly apiUrl: string;
}
