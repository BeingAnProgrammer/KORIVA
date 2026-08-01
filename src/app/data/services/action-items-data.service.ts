import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ActionItem } from '../models/action-item.model';
import { COMMITMENTS } from '../mock/commitments.mock-data';

@Injectable({ providedIn: 'root' })
export class ActionItemsDataService {
  getCommitments(): Observable<readonly ActionItem[]> {
    return of(COMMITMENTS);
  }
}
