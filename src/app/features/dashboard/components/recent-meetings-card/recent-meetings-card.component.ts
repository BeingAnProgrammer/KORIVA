import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { slugify } from '../../../../core/utils/slugify';
import { MeetingSummary } from '../../../../data/models/meeting-summary.model';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/** Dashboard "Recent meetings" card — ported verbatim. */
@Component({
  selector: 'app-recent-meetings-card',
  imports: [RouterLink, IconComponent],
  templateUrl: './recent-meetings-card.component.html',
  styleUrl: './recent-meetings-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentMeetingsCardComponent {
  readonly meetings = input.required<readonly MeetingSummary[]>();

  protected readonly slugify = slugify;
}
