import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { UpcomingMeeting } from '../../../../data/models/upcoming-meeting.model';
import { StatusPillComponent } from '../../../../shared/ui/status-pill/status-pill.component';

/** Daily-focus "Today & tomorrow" vertical timeline — ported verbatim. */
@Component({
  selector: 'app-today-tomorrow-timeline',
  imports: [StatusPillComponent],
  templateUrl: './today-tomorrow-timeline.component.html',
  styleUrl: './today-tomorrow-timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodayTomorrowTimelineComponent {
  readonly meetings = input.required<readonly UpcomingMeeting[]>();
}
