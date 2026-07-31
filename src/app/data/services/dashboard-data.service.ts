import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IntelligenceSignal } from '../models/intelligence-signal.model';
import { Insight } from '../models/insight.model';
import { Kpi } from '../models/kpi.model';
import { MeetingSummary } from '../models/meeting-summary.model';
import { NeedsAttentionItem } from '../models/needs-attention-item.model';
import { UpcomingMeeting } from '../models/upcoming-meeting.model';
import {
  INSIGHTS,
  INTELLIGENCE_FEED,
  KPIS,
  NEEDS_ATTENTION,
  POPULAR_QUESTIONS,
  RECENT_MEETINGS,
  UPCOMING_MEETINGS
} from '../mock/dashboard.mock-data';

/** Read-only content for the Dashboard page. */
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

  getNeedsAttention(): Observable<readonly NeedsAttentionItem[]> {
    return of(NEEDS_ATTENTION);
  }

  getIntelligenceFeed(): Observable<readonly IntelligenceSignal[]> {
    return of(INTELLIGENCE_FEED);
  }

  getPopularQuestions(): Observable<readonly string[]> {
    return of(POPULAR_QUESTIONS);
  }

  getInsights(): Observable<readonly Insight[]> {
    return of(INSIGHTS);
  }
}
