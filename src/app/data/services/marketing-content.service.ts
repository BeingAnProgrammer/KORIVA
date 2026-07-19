import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Feature, FeatureCard } from '../models/feature.model';
import { MeetingType } from '../models/meeting-type.model';
import { NavPill } from '../models/nav-pill.model';
import { Stat } from '../models/stat.model';
import { AI_QUERIES, FEATURE_CARDS, FEATURE_LEAD, FEATURES, MEETING_TYPES, STATS } from '../mock/marketing.mock-data';
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

  getFeatures(): Observable<readonly Feature[]> {
    return of(FEATURES);
  }

  getFeatureLead(): Observable<Feature> {
    return of(FEATURE_LEAD);
  }

  getFeatureCards(): Observable<readonly FeatureCard[]> {
    return of(FEATURE_CARDS);
  }

  getMeetingTypes(): Observable<readonly MeetingType[]> {
    return of(MEETING_TYPES);
  }

  getAiQueries(): Observable<readonly string[]> {
    return of(AI_QUERIES);
  }

  getStats(): Observable<readonly Stat[]> {
    return of(STATS);
  }
}
