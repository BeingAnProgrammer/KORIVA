import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Team } from '../models/team.model';
import { TEAMS_LIST } from '../mock/teams.mock-data';

@Injectable({ providedIn: 'root' })
export class TeamsDataService {
  getTeams(): Observable<readonly Team[]> {
    return of(TEAMS_LIST);
  }
}
