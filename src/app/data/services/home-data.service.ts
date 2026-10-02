import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AskSuggestion } from '../models/ask-suggestion.model';
import { LiveMeeting } from '../models/live-meeting.model';
import { HOME_ASK_EYEBROW, HOME_ASK_SUGGESTIONS, LIVE_MEETING } from '../mock/home.mock-data';

@Injectable({ providedIn: 'root' })
export class HomeDataService {
  readonly askEyebrow = HOME_ASK_EYEBROW;

  getAskSuggestions(): Observable<readonly AskSuggestion[]> {
    return of(HOME_ASK_SUGGESTIONS);
  }

  getLiveMeeting(): Observable<LiveMeeting> {
    return of(LIVE_MEETING);
  }
}
