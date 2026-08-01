import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Meeting } from '../models/meeting.model';
import { MEETINGS } from '../mock/meetings.mock-data';

/** Read-only content for the Meetings page (list + drawer). */
@Injectable({ providedIn: 'root' })
export class MeetingsDataService {
  getMeetings(): Observable<readonly Meeting[]> {
    return of(MEETINGS);
  }
}
