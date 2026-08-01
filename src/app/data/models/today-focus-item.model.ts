import { Tone } from './tone.model';

/** One row in Home's "Three things need you today" list. */
export interface TodayFocusItem {
  tone: Tone;
  title: string;
  description: string;
  ctaLabel: string;
}
