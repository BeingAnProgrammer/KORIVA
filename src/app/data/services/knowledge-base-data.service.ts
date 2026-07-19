import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { KbCategory } from '../models/kb-category.model';
import { MeetingSummary } from '../models/meeting-summary.model';
import { RECENT_MEETINGS } from '../mock/dashboard.mock-data';
import { KB_CATEGORIES } from '../mock/knowledge-base.mock-data';

@Injectable({ providedIn: 'root' })
export class KnowledgeBaseDataService {
  getCategories(): Observable<readonly KbCategory[]> {
    return of(KB_CATEGORIES);
  }

  getRecentlyAdded(): Observable<readonly MeetingSummary[]> {
    return of(RECENT_MEETINGS);
  }
}
