import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Pattern } from '../models/pattern.model';
import { PATTERNS } from '../mock/patterns.mock-data';

@Injectable({ providedIn: 'root' })
export class PatternsDataService {
  getPatterns(): Observable<readonly Pattern[]> {
    return of(PATTERNS);
  }
}
