import { Tone } from './tone.model';

export type MeetingStatus = 'live' | 'upcoming' | 'done';

/** One decision/commitment/risk tag pill shown on a meeting row. */
export interface MeetingStat {
  tone: Tone;
  label: string;
}

/**
 * The canonical meeting record — the reference's single MEETINGS source of
 * truth, looked up by id from Home ("rest of today"), Meetings (the list +
 * drawer), Commitments ("from <meeting> →"), and Memory (thread timelines).
 */
export interface Meeting {
  id: string;
  title: string;
  date: string;
  day: string;
  cat: string;
  color: Tone;
  status: MeetingStatus;
  dur: string;
  people: readonly string[];
  summary: string;
  stats: readonly MeetingStat[];
  minutes: readonly string[];
  related: readonly string[];
}
