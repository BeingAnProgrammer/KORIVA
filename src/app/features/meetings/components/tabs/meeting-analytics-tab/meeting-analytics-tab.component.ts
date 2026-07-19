import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PercentageBarItem } from '../../../../../shared/ui/percentage-bar-list/percentage-bar-list.model';
import { PercentageBarListComponent } from '../../../../../shared/ui/percentage-bar-list/percentage-bar-list.component';

const TALK_TIME: readonly PercentageBarItem[] = [
  { label: 'Marcus Kane', percentage: '44%', color: 'var(--accent)' },
  { label: 'Ava Reyes', percentage: '33%', color: 'var(--accent)' },
  { label: 'Priya Nair', percentage: '23%', color: 'var(--accent)' }
];

interface Signal {
  value: string;
  label: string;
  color?: string;
}

const SIGNALS: readonly Signal[] = [
  { value: '3', label: 'Decisions' },
  { value: '6', label: 'Action items' },
  { value: '2', label: 'Risks flagged' },
  { value: '+8.1%', label: 'Sentiment', color: 'var(--accent)' }
];

/** Meeting detail "Analytics" tab — ported verbatim. */
@Component({
  selector: 'app-meeting-analytics-tab',
  imports: [PercentageBarListComponent],
  templateUrl: './meeting-analytics-tab.component.html',
  styleUrl: './meeting-analytics-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingAnalyticsTabComponent {
  protected readonly talkTime = TALK_TIME;
  protected readonly signals = SIGNALS;
}
