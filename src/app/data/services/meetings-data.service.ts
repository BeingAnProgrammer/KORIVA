import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MeetingSummary } from '../models/meeting-summary.model';
import { TranscriptLine } from '../models/transcript-line.model';
import { UpcomingMeeting } from '../models/upcoming-meeting.model';
import { RECENT_MEETINGS, UPCOMING_MEETINGS } from '../mock/dashboard.mock-data';
import { TRANSCRIPT_LINES } from '../mock/transcript.mock-data';

/**
 * Read-only content for the Meetings list + Meeting detail pages. The
 * prototype models a single demo meeting's detail content regardless of
 * which row was clicked; `meetingId` is accepted on detail lookups so a
 * real backend can key off it once one exists.
 */
@Injectable({ providedIn: 'root' })
export class MeetingsDataService {
  getUpcomingMeetings(): Observable<readonly UpcomingMeeting[]> {
    return of(UPCOMING_MEETINGS);
  }

  getCompletedMeetings(): Observable<readonly MeetingSummary[]> {
    return of(RECENT_MEETINGS);
  }

  getTranscript(_meetingId: string): Observable<readonly TranscriptLine[]> {
    return of(TRANSCRIPT_LINES);
  }
}
