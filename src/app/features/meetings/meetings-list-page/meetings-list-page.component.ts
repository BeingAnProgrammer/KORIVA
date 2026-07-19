import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SeoService } from '../../../core/services/seo.service';
import { MeetingsDataService } from '../../../data/services/meetings-data.service';
import { FilterButtonComponent } from '../../../shared/ui/filter-button/filter-button.component';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { CompletedMeetingCardComponent } from '../components/completed-meeting-card/completed-meeting-card.component';
import { UpcomingMeetingsTableComponent } from '../components/upcoming-meetings-table/upcoming-meetings-table.component';

@Component({
  selector: 'app-meetings-list-page',
  imports: [IconComponent, FilterButtonComponent, UpcomingMeetingsTableComponent, CompletedMeetingCardComponent],
  templateUrl: './meetings-list-page.component.html',
  styleUrl: './meetings-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingsListPageComponent {
  private readonly seo = inject(SeoService);
  private readonly data = inject(MeetingsDataService);

  protected readonly upcomingMeetings = toSignal(this.data.getUpcomingMeetings(), { initialValue: [] });
  protected readonly completedMeetings = toSignal(this.data.getCompletedMeetings(), { initialValue: [] });

  constructor() {
    this.seo.setPage({
      title: 'Meetings',
      description: 'Upcoming and completed meetings across your organization.',
      path: '/app/meetings'
    });
  }
}
