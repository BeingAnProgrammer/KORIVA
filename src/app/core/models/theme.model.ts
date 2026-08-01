export type ThemeMode = 'system' | 'light' | 'dark';

/** One swatch in the Settings accent-colour picker. */
export interface AccentOption {
  readonly name: string;
  readonly hex: string;
}

/** Matches the reference design's `ACCENTS` list exactly — Indigo is the default. */
export const ACCENT_OPTIONS: readonly AccentOption[] = [
  { name: 'Indigo', hex: '#5B54F0' },
  { name: 'Blue', hex: '#2E7DF7' },
  { name: 'Violet', hex: '#8B5CF6' },
  { name: 'Green', hex: '#0FA96B' }
];
