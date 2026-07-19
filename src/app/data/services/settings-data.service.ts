import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SettingsNavItem } from '../models/settings-nav-item.model';
import { SETTINGS_NAV_ITEMS } from '../mock/settings.mock-data';

@Injectable({ providedIn: 'root' })
export class SettingsDataService {
  getNavItems(): Observable<readonly SettingsNavItem[]> {
    return of(SETTINGS_NAV_ITEMS);
  }
}
