import { Injectable, signal } from '@angular/core';

import { MeetingSchedule, MeetingScheduleDraft } from '../models/meeting-schedule.model';
import { MOCK_SCHEDULED_MEETINGS } from '../mock/schedule.mock-data';

/**
 * Exposes a signal (not an Observable, unlike its sibling data services) —
 * scheduling a meeting here mutates the list in place, so the calendar
 * reflects it immediately without a refetch. Swap the signal body for a real
 * HTTP call + refresh when the backend exists; the public shape stays the same.
 */
@Injectable({ providedIn: 'root' })
export class ScheduleDataService {
  private readonly _meetings = signal<readonly MeetingSchedule[]>(MOCK_SCHEDULED_MEETINGS);
  readonly meetings = this._meetings.asReadonly();

  scheduleMeeting(draft: MeetingScheduleDraft): MeetingSchedule {
    const meeting: MeetingSchedule = {
      ...draft,
      id: `meeting-${Math.round(Math.random() * 1e9)}`,
      status: draft.meetingType === 'instant' ? 'starting-soon' : 'scheduled',
      createdAt: new Date().toISOString()
    };
    this._meetings.update((all) => [...all, meeting]);
    return meeting;
  }
}
