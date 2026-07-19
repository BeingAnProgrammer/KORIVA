export type MeetingTabKey = 'overview' | 'transcript' | 'mom' | 'recording' | 'analytics' | 'actions' | 'ai';

/** A tab in the meeting-detail tab strip. */
export interface MeetingTab {
  key: MeetingTabKey;
  label: string;
  icon: string;
}
