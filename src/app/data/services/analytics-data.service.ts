import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AnalyticsTabData } from '../models/analytics-tab.model';
import { ANALYTICS_MONTHS, ANALYTICS_TABS } from '../mock/analytics-tabs.mock-data';

@Injectable({ providedIn: 'root' })
export class AnalyticsDataService {
  readonly months = ANALYTICS_MONTHS;

  getAnalyticsTabs(): Observable<readonly AnalyticsTabData[]> {
    return of(ANALYTICS_TABS);
  }
}
