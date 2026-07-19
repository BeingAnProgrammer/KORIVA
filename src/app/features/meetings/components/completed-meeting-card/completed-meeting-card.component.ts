import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { slugify } from '../../../../core/utils/slugify';
import { MeetingSummary } from '../../../../data/models/meeting-summary.model';
import { ChipComponent } from '../../../../shared/ui/chip/chip.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/** Meetings list "Completed" card — ported verbatim. */
@Component({
  selector: 'app-completed-meeting-card',
  imports: [RouterLink, ChipComponent, IconComponent],
  templateUrl: './completed-meeting-card.component.html',
  styleUrl: './completed-meeting-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompletedMeetingCardComponent {
  readonly meeting = input.required<MeetingSummary>();

  protected readonly slugify = slugify;
}
