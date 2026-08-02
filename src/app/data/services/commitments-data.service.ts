import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Commitment } from '../models/commitment.model';
import { COMMITMENTS } from '../mock/commitments.mock-data';

@Injectable({ providedIn: 'root' })
export class CommitmentsDataService {
  getCommitments(): Observable<readonly Commitment[]> {
    return of(COMMITMENTS);
  }
}
