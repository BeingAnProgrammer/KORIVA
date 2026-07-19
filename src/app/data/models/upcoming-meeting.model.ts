import { PillVariant } from './pill-variant.model';

/** An upcoming/scheduled meeting row (dashboard + meetings list). */
export interface UpcomingMeeting {
  title: string;
  type: string;
  date: string;
  time: string;
  platform: string;
  people: string;
  status: string;
  statusVariant: PillVariant;
}
