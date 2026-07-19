import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Automation } from '../models/automation.model';
import { AUTOMATIONS } from '../mock/automations.mock-data';

@Injectable({ providedIn: 'root' })
export class AutomationsDataService {
  getAutomations(): Observable<readonly Automation[]> {
    return of(AUTOMATIONS);
  }
}
