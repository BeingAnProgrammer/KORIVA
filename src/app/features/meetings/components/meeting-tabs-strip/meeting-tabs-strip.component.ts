import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MeetingTabKey } from '../../../../data/models/meeting-tab.model';
import { MEETING_TABS } from '../../../../data/mock/navigation.mock-data';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/** Meeting-detail tab strip — ported verbatim, URL-driven via routerLink. */
@Component({
  selector: 'app-meeting-tabs-strip',
  imports: [RouterLink, IconComponent],
  templateUrl: './meeting-tabs-strip.component.html',
  styleUrl: './meeting-tabs-strip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingTabsStripComponent {
  readonly meetingId = input.required<string>();
  readonly activeTab = input.required<MeetingTabKey>();

  protected readonly tabs = MEETING_TABS;
}
