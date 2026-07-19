/** A completed meeting summary card (dashboard "recent" + meetings list "completed"). */
export interface MeetingSummary {
  title: string;
  type: string;
  date: string;
  duration: string;
  actionsCount: number;
  summary: string;
}
