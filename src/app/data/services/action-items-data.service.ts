import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ActionItem } from '../models/action-item.model';
import { ACTION_ITEMS } from '../mock/action-items.mock-data';

@Injectable({ providedIn: 'root' })
export class ActionItemsDataService {
  getActionItems(): Observable<readonly ActionItem[]> {
    return of(ACTION_ITEMS);
  }
}
