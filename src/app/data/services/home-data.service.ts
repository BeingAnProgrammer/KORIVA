import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AskSuggestion } from '../models/ask-suggestion.model';
import { LiveMeeting } from '../models/live-meeting.model';
import { MorningBriefing } from '../models/morning-briefing.model';
import { TodayFocusItem } from '../models/today-focus-item.model';
import {
  HOME_ASK_EYEBROW,
  HOME_ASK_SUGGESTIONS,
  LIVE_MEETING,
  MORNING_BRIEFING,
  REST_OF_TODAY_FILED_NOTE,
  REST_OF_TODAY_FILED_TITLES,
  TODAY_FOCUS_ITEMS
} from '../mock/home.mock-data';

@Injectable({ providedIn: 'root' })
export class HomeDataService {
  readonly askEyebrow = HOME_ASK_EYEBROW;
  readonly restOfTodayFiledNote = REST_OF_TODAY_FILED_NOTE;
  readonly restOfTodayFiledTitles = REST_OF_TODAY_FILED_TITLES;

  getAskSuggestions(): Observable<readonly AskSuggestion[]> {
    return of(HOME_ASK_SUGGESTIONS);
  }

  getLiveMeeting(): Observable<LiveMeeting> {
    return of(LIVE_MEETING);
  }

  getMorningBriefing(): Observable<MorningBriefing> {
    return of(MORNING_BRIEFING);
  }

  getTodayFocusItems(): Observable<readonly TodayFocusItem[]> {
    return of(TODAY_FOCUS_ITEMS);
  }
}
