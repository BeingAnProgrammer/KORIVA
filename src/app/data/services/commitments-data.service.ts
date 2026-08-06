import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Commitment } from '../models/commitment.model';
import { COMMITMENTS } from '../mock/commitments.mock-data';

/** Read-only content for the Commitments page (list + drawer), also used by Home and the command palette. */
@Injectable({ providedIn: 'root' })
export class CommitmentsDataService {
  getCommitments(): Observable<readonly Commitment[]> {
    return of(COMMITMENTS);
  }
}
