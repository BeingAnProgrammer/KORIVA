import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Insight } from '../models/insight.model';
import { Kpi } from '../models/kpi.model';
import { MeetingSummary } from '../models/meeting-summary.model';
import { TeamActivity } from '../models/team-activity.model';
import { UpcomingMeeting } from '../models/upcoming-meeting.model';
import { INSIGHTS, KPIS, RECENT_MEETINGS, TEAM_ACTIVITY, UPCOMING_MEETINGS } from '../mock/dashboard.mock-data';

/** Read-only content for the Dashboard page (command centre + daily focus). */
@Injectable({ providedIn: 'root' })
export class DashboardDataService {
  getKpis(): Observable<readonly Kpi[]> {
    return of(KPIS);
  }

  getUpcomingMeetings(): Observable<readonly UpcomingMeeting[]> {
    return of(UPCOMING_MEETINGS);
  }

  getRecentMeetings(): Observable<readonly MeetingSummary[]> {
    return of(RECENT_MEETINGS);
  }

  getTeamActivity(): Observable<readonly TeamActivity[]> {
    return of(TEAM_ACTIVITY);
  }

  getInsights(): Observable<readonly Insight[]> {
    return of(INSIGHTS);
  }
}
