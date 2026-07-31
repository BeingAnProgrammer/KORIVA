/** A completed meeting summary card (dashboard "recent" + meetings list "completed"). */
export interface MeetingSummary {
  title: string;
  type: string;
  date: string;
  duration: string;
  actionsCount: number;
  summary: string;
  /** Not populated by every consumer of this shared model (e.g. Intelligence's "recently added" list) — optional rather than forcing every mock array to carry it. */
  participants?: string;
}
