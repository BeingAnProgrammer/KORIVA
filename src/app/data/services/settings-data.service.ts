import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ConnectionItem } from '../models/connection-item.model';
import { ToggleItem } from '../models/toggle-item.model';
import { CONNECTIONS, TOGGLE_ITEMS } from '../mock/settings.mock-data';

@Injectable({ providedIn: 'root' })
export class SettingsDataService {
  getToggles(): Observable<readonly ToggleItem[]> {
    return of(TOGGLE_ITEMS);
  }

  getConnections(): Observable<readonly ConnectionItem[]> {
    return of(CONNECTIONS);
  }
}
