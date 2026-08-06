export type MeetingPlatform = 'google-meet' | 'zoom' | 'teams';

export type MeetingKind = 'instant' | 'scheduled';

export type MeetingScheduleStatus = 'scheduled' | 'starting-soon' | 'completed';

/**
 * How Koriva presents itself once it joins — kept separate from the meeting
 * fields so it can be reused as a standing preference later without dragging
 * a specific meeting along with it.
 */
export interface KorivaIdentity {
  displayName: string;
  /** Data URL of an uploaded image, or null to fall back to the Koriva mark. */
  avatar: string | null;
}

/** Everything the form collects, before the backend assigns an id/status. */
export interface MeetingScheduleDraft {
  title: string;
  platform: MeetingPlatform;
  url: string;
  meetingType: MeetingKind;
  /** yyyy-MM-dd. Empty for instant meetings. */
  scheduledDate: string;
  /** HH:mm. Empty for instant meetings. */
  startTime: string;
  /** HH:mm. Empty for instant meetings. */
  endTime: string;
  entryMessage: string;
  identity: KorivaIdentity;
}

/** The canonical scheduled-meeting record, as it would come back from the API. */
export interface MeetingSchedule extends MeetingScheduleDraft {
  id: string;
  status: MeetingScheduleStatus;
  createdAt: string;
}
