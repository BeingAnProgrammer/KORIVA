import { Tone } from './tone.model';

/** One suggestion chip under the Home "Ask anything…" box. */
export interface AskSuggestion {
  label: string;
  tone: Tone;
}
