import { Tone } from './tone.model';

export type CommitmentStatus = 'live' | 'upcoming' | 'done';

/** One decision/commitment/risk tag pill shown on a commitment row. */
export interface CommitmentStat {
  tone: Tone;
  label: string;
}

/**
 * The canonical commitment record — the reference's single COMMITMENTS
 * source of truth, looked up by id from Home ("rest of today"), Commitments
 * (the list + drawer), and Memory (thread timelines).
 */
export interface Commitment {
  id: string;
  title: string;
  date: string;
  day: string;
  cat: string;
  color: Tone;
  status: CommitmentStatus;
  dur: string;
  people: readonly string[];
  summary: string;
  stats: readonly CommitmentStat[];
  minutes: readonly string[];
  related: readonly string[];
}
