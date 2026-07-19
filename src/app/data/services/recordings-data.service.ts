import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Recording } from '../models/recording.model';
import { RECORDINGS } from '../mock/recordings.mock-data';

@Injectable({ providedIn: 'root' })
export class RecordingsDataService {
  getRecordings(): Observable<readonly Recording[]> {
    return of(RECORDINGS);
  }
}
