import { Tone } from './tone.model';

export type ThreadKind = 'Customer' | 'Project' | 'Open question' | 'Person';

/** One entry in a thread's chronological "in order" timeline. */
export interface ThreadTimelineItem {
  date: string;
  title: string;
  team: string;
  color: Tone;
}

/** An entity thread — a person, company, or project stitched across meetings. */
export interface Thread {
  id: string;
  name: string;
  kind: ThreadKind;
  count: number;
  note: string;
  items: readonly ThreadTimelineItem[];
  facts: readonly string[];
}
