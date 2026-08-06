import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface MeetingSummaryView {
  title: string;
  platformLabel: string;
  platformIconSrc?: string;
  timeLabel: string;
  displayName: string;
  entryMessageConfigured: boolean;
}

/** Read-only, live-updating recap of the form state — no logic of its own. */
@Component({
  selector: 'app-meeting-summary',
  templateUrl: './meeting-summary.component.html',
  styleUrl: './meeting-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingSummaryComponent {
  readonly summary = input.required<MeetingSummaryView>();
}
