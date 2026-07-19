import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { slugify } from '../../../../core/utils/slugify';
import { UpcomingMeeting } from '../../../../data/models/upcoming-meeting.model';
import { StatusPillComponent } from '../../../../shared/ui/status-pill/status-pill.component';

/** Meetings list "Upcoming" table — ported verbatim. */
@Component({
  selector: 'app-upcoming-meetings-table',
  imports: [RouterLink, StatusPillComponent],
  templateUrl: './upcoming-meetings-table.component.html',
  styleUrl: './upcoming-meetings-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpcomingMeetingsTableComponent {
  readonly meetings = input.required<readonly UpcomingMeeting[]>();

  protected readonly slugify = slugify;
}
