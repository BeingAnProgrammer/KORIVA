import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { SeoService } from '../../../core/services/seo.service';
import { ToastService } from '../../../core/services/toast.service';
import { ActionItem } from '../../../data/models/action-item.model';
import { Meeting } from '../../../data/models/meeting.model';
import { ActionItemsDataService } from '../../../data/services/action-items-data.service';
import { MeetingsDataService } from '../../../data/services/meetings-data.service';
import { ButtonDirective } from '../../../shared/directives/button.directive';
import { SegmentedControlComponent } from '../../../shared/ui/segmented-control/segmented-control.component';
import { SegmentedOption } from '../../../shared/ui/segmented-control/segmented-option.model';
import { MeetingDrawerComponent } from '../../meetings/components/meeting-drawer/meeting-drawer.component';
import { CommitmentCardComponent } from '../components/commitment-card/commitment-card.component';

type CommitmentFilter = 'open' | 'late' | 'mine' | 'done' | 'all';

@Component({
  selector: 'app-commitments-page',
  imports: [SegmentedControlComponent, ButtonDirective, CommitmentCardComponent, MeetingDrawerComponent],
  templateUrl: './commitments-page.component.html',
  styleUrl: './commitments-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitmentsPageComponent {
  private readonly seo = inject(SeoService);
  private readonly toast = inject(ToastService);
  private readonly data = inject(ActionItemsDataService);
  private readonly meetingsData = inject(MeetingsDataService);

  protected readonly commitments = signal<ActionItem[]>([]);
  protected readonly meetings = toSignal(this.meetingsData.getMeetings(), { initialValue: [] });
  protected readonly filter = signal<CommitmentFilter>('open');
  protected readonly selectedMeeting = signal<Meeting | null>(null);

  protected readonly openCount = computed(() => this.commitments().filter((c) => !c.done).length);
  protected readonly lateCount = computed(() => this.commitments().filter((c) => !c.done && c.late).length);

  protected readonly filterOptions = computed<readonly SegmentedOption<CommitmentFilter>[]>(() => {
    const all = this.commitments();
    return [
      { value: 'open', label: 'Open', count: all.filter((c) => !c.done).length },
      { value: 'late', label: 'Late', count: all.filter((c) => !c.done && c.late).length },
      { value: 'mine', label: 'Mine', count: all.filter((c) => c.owner === 'You').length },
      { value: 'done', label: 'Done', count: all.filter((c) => c.done).length },
      { value: 'all', label: 'All', count: all.length }
    ];
  });

  protected readonly filteredCommitments = computed(() => {
    const all = this.commitments();
    switch (this.filter()) {
      case 'open':
        return all.filter((c) => !c.done);
      case 'late':
        return all.filter((c) => !c.done && c.late);
      case 'mine':
        return all.filter((c) => c.owner === 'You');
      case 'done':
        return all.filter((c) => c.done);
      default:
        return all;
    }
  });

  constructor() {
    this.seo.setPage({
      title: 'Commitments',
      description: 'Every promise, with the sentence it came from.',
      path: '/app/commitments'
    });

    this.data
      .getCommitments()
      .pipe(takeUntilDestroyed())
      .subscribe((items) => this.commitments.set([...items]));
  }

  protected toggleDone(item: ActionItem): void {
    this.commitments.update((items) =>
      items.map((c) => {
        if (c.id !== item.id) {
          return c;
        }
        const done = !c.done;
        return { ...c, done, late: done ? false : c.late };
      })
    );
  }

  protected openMeetingFor(item: ActionItem): void {
    const meeting = this.meetings().find((m) => m.id === item.meetingId);
    if (meeting) {
      this.selectedMeeting.set(meeting);
    }
  }

  protected closeDrawer(): void {
    this.selectedMeeting.set(null);
  }

  protected nudgeEveryoneLate(): void {
    this.toast.show(`Nudges sent for ${this.lateCount()} late promises`);
  }

  protected nudge(item: ActionItem): void {
    this.toast.show(`Nudge sent to ${item.owner}`);
  }
}
