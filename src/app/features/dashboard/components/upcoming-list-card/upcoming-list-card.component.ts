import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { UpcomingMeeting } from '../../../../data/models/upcoming-meeting.model';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { StatusPillComponent } from '../../../../shared/ui/status-pill/status-pill.component';

/** Dashboard "Upcoming" card — ported verbatim. */
@Component({
  selector: 'app-upcoming-list-card',
  imports: [IconComponent, StatusPillComponent],
  templateUrl: './upcoming-list-card.component.html',
  styleUrl: './upcoming-list-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpcomingListCardComponent {
  readonly meetings = input.required<readonly UpcomingMeeting[]>();
}
