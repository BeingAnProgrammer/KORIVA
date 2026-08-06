import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconComponent } from '../../../../shared/ui/icon/icon.component';

export interface MeetingSummaryView {
  title: string;
  platformLabel: string;
  platformIcon: string;
  timeLabel: string;
  displayName: string;
  entryMessageConfigured: boolean;
}

/** Read-only, live-updating recap of the form state — no logic of its own. */
@Component({
  selector: 'app-meeting-summary',
  imports: [IconComponent],
  templateUrl: './meeting-summary.component.html',
  styleUrl: './meeting-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingSummaryComponent {
  readonly summary = input.required<MeetingSummaryView>();
}
