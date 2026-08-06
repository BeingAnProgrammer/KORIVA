import { addDays, toIsoDate } from '../../core/utils/date';
import { SegmentedOption } from '../../shared/ui/segmented-control/segmented-option.model';
import { MeetingKind, MeetingPlatform, MeetingSchedule } from '../models/meeting-schedule.model';

export const DEFAULT_ENTRY_MESSAGE = `Hi everyone 👋

I'm Koriva.
I'll record this meeting, generate a transcript, identify decisions, action items, and produce AI-generated minutes afterwards.`;

export const DEFAULT_KORIVA_DISPLAY_NAME = 'Koriva AI';

// Brand marks aren't in Lucide's core set (see icon-registry.ts) — these are
// the closest distinct stand-ins, same approach as the Slack row in Settings.
export const MEETING_PLATFORM_OPTIONS: readonly SegmentedOption<MeetingPlatform>[] = [
  { value: 'google-meet', label: 'Google Meet', icon: 'webcam' },
  { value: 'zoom', label: 'Zoom', icon: 'video' },
  { value: 'teams', label: 'Microsoft Teams', icon: 'users' }
];

export const MEETING_KIND_OPTIONS: readonly SegmentedOption<MeetingKind>[] = [
  { value: 'instant', label: 'Instant Meeting', icon: 'play' },
  { value: 'scheduled', label: 'Scheduled Meeting', icon: 'calendar-clock' }
];

export function getPlatformOption(platform: MeetingPlatform): SegmentedOption<MeetingPlatform> {
  return MEETING_PLATFORM_OPTIONS.find((option) => option.value === platform) ?? { value: platform, label: platform, icon: 'video' };
}

const today = () => new Date();
const at = (offsetDays: number) => toIsoDate(addDays(today(), offsetDays));

/**
 * Seeded relative to today (not fixed calendar dates) so the demo calendar
 * always shows a populated current month, whenever it's actually opened.
 */
export const MOCK_SCHEDULED_MEETINGS: readonly MeetingSchedule[] = [
  {
    id: 'mock-1',
    title: 'Design Review Meeting',
    platform: 'zoom',
    url: 'https://zoom.us/j/1234567890',
    meetingType: 'scheduled',
    scheduledDate: at(-3),
    startTime: '10:00',
    endTime: '11:00',
    entryMessage: DEFAULT_ENTRY_MESSAGE,
    identity: { displayName: DEFAULT_KORIVA_DISPLAY_NAME, avatar: null },
    status: 'completed',
    createdAt: at(-10)
  },
  {
    id: 'mock-2',
    title: 'Sprint Planning',
    platform: 'google-meet',
    url: 'https://meet.google.com/abc-defg-hij',
    meetingType: 'scheduled',
    scheduledDate: at(-3),
    startTime: '13:00',
    endTime: '14:00',
    entryMessage: DEFAULT_ENTRY_MESSAGE,
    identity: { displayName: DEFAULT_KORIVA_DISPLAY_NAME, avatar: null },
    status: 'completed',
    createdAt: at(-10)
  },
  {
    id: 'mock-3',
    title: 'Brainstorming Session',
    platform: 'zoom',
    url: 'https://zoom.us/j/2345678901',
    meetingType: 'scheduled',
    scheduledDate: at(0),
    startTime: '10:00',
    endTime: '11:00',
    entryMessage: DEFAULT_ENTRY_MESSAGE,
    identity: { displayName: DEFAULT_KORIVA_DISPLAY_NAME, avatar: null },
    status: 'scheduled',
    createdAt: at(-4)
  },
  {
    id: 'mock-4',
    title: 'Strategy Meeting',
    platform: 'google-meet',
    url: 'https://meet.google.com/klm-nopq-rst',
    meetingType: 'scheduled',
    scheduledDate: at(1),
    startTime: '14:00',
    endTime: '15:00',
    entryMessage: DEFAULT_ENTRY_MESSAGE,
    identity: { displayName: DEFAULT_KORIVA_DISPLAY_NAME, avatar: null },
    status: 'scheduled',
    createdAt: at(-2)
  },
  {
    id: 'mock-5',
    title: 'Budget Review',
    platform: 'teams',
    url: 'https://teams.microsoft.com/l/meetup-join/budget-review',
    meetingType: 'scheduled',
    scheduledDate: at(1),
    startTime: '16:00',
    endTime: '17:00',
    entryMessage: DEFAULT_ENTRY_MESSAGE,
    identity: { displayName: DEFAULT_KORIVA_DISPLAY_NAME, avatar: null },
    status: 'scheduled',
    createdAt: at(-2)
  },
  {
    id: 'mock-6',
    title: 'Client Feedback Session',
    platform: 'zoom',
    url: 'https://zoom.us/j/3456789012',
    meetingType: 'scheduled',
    scheduledDate: at(5),
    startTime: '09:00',
    endTime: '10:00',
    entryMessage: DEFAULT_ENTRY_MESSAGE,
    identity: { displayName: DEFAULT_KORIVA_DISPLAY_NAME, avatar: null },
    status: 'scheduled',
    createdAt: at(-1)
  },
  {
    id: 'mock-7',
    title: 'Weekly Standup',
    platform: 'teams',
    url: 'https://teams.microsoft.com/l/meetup-join/weekly-standup',
    meetingType: 'scheduled',
    scheduledDate: at(8),
    startTime: '09:00',
    endTime: '09:30',
    entryMessage: DEFAULT_ENTRY_MESSAGE,
    identity: { displayName: DEFAULT_KORIVA_DISPLAY_NAME, avatar: null },
    status: 'scheduled',
    createdAt: at(-1)
  },
  {
    id: 'mock-8',
    title: 'Feature Demo',
    platform: 'zoom',
    url: 'https://zoom.us/j/4567890123',
    meetingType: 'scheduled',
    scheduledDate: at(8),
    startTime: '11:00',
    endTime: '12:00',
    entryMessage: DEFAULT_ENTRY_MESSAGE,
    identity: { displayName: DEFAULT_KORIVA_DISPLAY_NAME, avatar: null },
    status: 'scheduled',
    createdAt: at(-1)
  },
  {
    id: 'mock-9',
    title: 'Product Launch Sync',
    platform: 'google-meet',
    url: 'https://meet.google.com/uvw-xyza-bcd',
    meetingType: 'scheduled',
    scheduledDate: at(12),
    startTime: '11:00',
    endTime: '12:00',
    entryMessage: DEFAULT_ENTRY_MESSAGE,
    identity: { displayName: DEFAULT_KORIVA_DISPLAY_NAME, avatar: null },
    status: 'scheduled',
    createdAt: at(-1)
  },
  {
    id: 'mock-10',
    title: 'Customer Feedback',
    platform: 'google-meet',
    url: 'https://meet.google.com/efg-hijk-lmn',
    meetingType: 'scheduled',
    scheduledDate: at(15),
    startTime: '13:00',
    endTime: '14:00',
    entryMessage: DEFAULT_ENTRY_MESSAGE,
    identity: { displayName: DEFAULT_KORIVA_DISPLAY_NAME, avatar: null },
    status: 'scheduled',
    createdAt: at(-1)
  },
  {
    id: 'mock-11',
    title: 'Design Iteration',
    platform: 'zoom',
    url: 'https://zoom.us/j/5678901234',
    meetingType: 'scheduled',
    scheduledDate: at(15),
    startTime: '15:00',
    endTime: '16:00',
    entryMessage: DEFAULT_ENTRY_MESSAGE,
    identity: { displayName: DEFAULT_KORIVA_DISPLAY_NAME, avatar: null },
    status: 'scheduled',
    createdAt: at(-1)
  },
  {
    id: 'mock-12',
    title: 'Team Celebration',
    platform: 'teams',
    url: 'https://teams.microsoft.com/l/meetup-join/team-celebration',
    meetingType: 'scheduled',
    scheduledDate: at(15),
    startTime: '17:00',
    endTime: '18:00',
    entryMessage: DEFAULT_ENTRY_MESSAGE,
    identity: { displayName: DEFAULT_KORIVA_DISPLAY_NAME, avatar: null },
    status: 'scheduled',
    createdAt: at(-1)
  },
  {
    id: 'mock-13',
    title: 'Quarterly Roadmap Review',
    platform: 'google-meet',
    url: 'https://meet.google.com/opq-rstu-vwx',
    meetingType: 'scheduled',
    scheduledDate: at(21),
    startTime: '10:00',
    endTime: '11:30',
    entryMessage: DEFAULT_ENTRY_MESSAGE,
    identity: { displayName: DEFAULT_KORIVA_DISPLAY_NAME, avatar: null },
    status: 'scheduled',
    createdAt: at(-1)
  }
];
