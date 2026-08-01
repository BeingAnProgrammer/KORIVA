import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SeoService } from '../../../core/services/seo.service';
import { ToastService } from '../../../core/services/toast.service';
import { Meeting } from '../../../data/models/meeting.model';
import { MeetingsDataService } from '../../../data/services/meetings-data.service';
import { ButtonDirective } from '../../../shared/directives/button.directive';
import { AvatarComponent } from '../../../shared/ui/avatar/avatar.component';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { SegmentedControlComponent } from '../../../shared/ui/segmented-control/segmented-control.component';
import { SegmentedOption } from '../../../shared/ui/segmented-control/segmented-option.model';
import { StatusPillComponent } from '../../../shared/ui/status-pill/status-pill.component';
import { MeetingDrawerComponent } from '../components/meeting-drawer/meeting-drawer.component';

type MeetingFilter = 'all' | 'live' | 'upcoming' | 'done';

@Component({
  selector: 'app-meetings-list-page',
  imports: [IconComponent, ButtonDirective, SegmentedControlComponent, StatusPillComponent, AvatarComponent, MeetingDrawerComponent],
  templateUrl: './meetings-list-page.component.html',
  styleUrl: './meetings-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingsListPageComponent {
  private readonly seo = inject(SeoService);
  private readonly toast = inject(ToastService);
  private readonly data = inject(MeetingsDataService);

  protected readonly meetings = toSignal(this.data.getMeetings(), { initialValue: [] });
  protected readonly filter = signal<MeetingFilter>('all');
  protected readonly query = signal('');
  protected readonly selectedMeeting = signal<Meeting | null>(null);

  protected readonly filterOptions = computed<readonly SegmentedOption<MeetingFilter>[]>(() => {
    const all = this.meetings();
    return [
      { value: 'all', label: 'All', count: all.length },
      { value: 'live', label: 'Live', count: all.filter((m) => m.status === 'live').length },
      { value: 'upcoming', label: 'Upcoming', count: all.filter((m) => m.status === 'upcoming').length },
      { value: 'done', label: 'Completed', count: all.filter((m) => m.status === 'done').length }
    ];
  });

  protected readonly filteredMeetings = computed(() => {
    const q = this.query().trim().toLowerCase();
    const f = this.filter();
    return this.meetings().filter((m) => {
      const matchesFilter = f === 'all' || m.status === f;
      const matchesQuery = !q || `${m.title} ${m.summary} ${m.cat}`.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  });

  constructor() {
    this.seo.setPage({
      title: 'Meetings',
      description: 'Every meeting, already understood — filter, search, and open the minutes.',
      path: '/app/meetings'
    });
  }

  protected openMeeting(meeting: Meeting): void {
    this.selectedMeeting.set(meeting);
  }

  protected closeDrawer(): void {
    this.selectedMeeting.set(null);
  }

  protected inviteKoriva(): void {
    this.toast.show('Koriva will join your next scheduled meeting');
  }

  protected loadOlder(): void {
    this.toast.show('Loaded 20 older meetings');
  }
}
