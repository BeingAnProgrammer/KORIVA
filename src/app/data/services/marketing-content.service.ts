import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ChatExchange } from '../models/chat-exchange.model';
import { Feature } from '../models/feature.model';
import { MeetingType } from '../models/meeting-type.model';
import { NavPill } from '../models/nav-pill.model';
import { PipelineStep } from '../models/pipeline-step.model';
import { Stat } from '../models/stat.model';
import { CHAT_EXCHANGES } from '../mock/chat-demo.mock-data';
import { AI_QUERIES, MEETING_TYPES, PIPELINE_STEPS, SHOWCASE_FEATURES, STATS } from '../mock/marketing.mock-data';
import { NAV_PILLS } from '../mock/navigation.mock-data';

/**
 * Read-only content for the marketing/landing page. Backed by static mock
 * data today; swap the method bodies for HttpClient calls against a real
 * CMS/API later without touching any landing-page component.
 */
@Injectable({ providedIn: 'root' })
export class MarketingContentService {
  getNavPills(): Observable<readonly NavPill[]> {
    return of(NAV_PILLS);
  }

  getPipelineSteps(): Observable<readonly PipelineStep[]> {
    return of(PIPELINE_STEPS);
  }

  getShowcaseFeatures(): Observable<readonly Feature[]> {
    return of(SHOWCASE_FEATURES);
  }

  getMeetingTypes(): Observable<readonly MeetingType[]> {
    return of(MEETING_TYPES);
  }

  getAiQueries(): Observable<readonly string[]> {
    return of(AI_QUERIES);
  }

  getChatExchanges(): Observable<readonly ChatExchange[]> {
    return of(CHAT_EXCHANGES);
  }

  getStats(): Observable<readonly Stat[]> {
    return of(STATS);
  }
}
