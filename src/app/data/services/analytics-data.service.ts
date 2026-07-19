import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CategoryStat } from '../models/category-stat.model';
import { Kpi } from '../models/kpi.model';
import { Team } from '../models/team.model';
import { CATEGORY_STATS } from '../mock/analytics.mock-data';
import { KPIS } from '../mock/dashboard.mock-data';
import { TEAMS_LIST } from '../mock/teams.mock-data';

@Injectable({ providedIn: 'root' })
export class AnalyticsDataService {
  getKpis(): Observable<readonly Kpi[]> {
    return of(KPIS);
  }

  getCategoryStats(): Observable<readonly CategoryStat[]> {
    return of(CATEGORY_STATS);
  }

  getTeamContributions(): Observable<readonly Team[]> {
    return of(TEAMS_LIST);
  }
}
