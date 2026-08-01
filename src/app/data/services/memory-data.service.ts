import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Thread } from '../models/thread.model';
import { THREADS } from '../mock/threads.mock-data';

@Injectable({ providedIn: 'root' })
export class MemoryDataService {
  getThreads(): Observable<readonly Thread[]> {
    return of(THREADS);
  }
}
