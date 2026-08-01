import { Tone } from './tone.model';

export type PatternDirection = 'up' | 'down' | 'flat';

/** An auto-surfaced recurring-topic card — Patterns page + Home's "Koriva is watching" preview. */
export interface Pattern {
  id: string;
  title: string;
  trend: string;
  dir: PatternDirection;
  color: Tone;
  detail: string;
  evidence: readonly string[];
}
