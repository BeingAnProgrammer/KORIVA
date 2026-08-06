import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';
import { ToastService } from '../../../core/services/toast.service';
import { Commitment } from '../../../data/models/commitment.model';
import { CommitmentsDataService } from '../../../data/services/commitments-data.service';
import { ButtonDirective } from '../../../shared/directives/button.directive';
import { AvatarComponent } from '../../../shared/ui/avatar/avatar.component';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { SegmentedControlComponent } from '../../../shared/ui/segmented-control/segmented-control.component';
import { SegmentedOption } from '../../../shared/ui/segmented-control/segmented-option.model';
import { StatusPillComponent } from '../../../shared/ui/status-pill/status-pill.component';
import { CommitmentDrawerComponent } from '../components/commitment-drawer/commitment-drawer.component';

type CommitmentFilter = 'all' | 'live' | 'upcoming' | 'done';

@Component({
  selector: 'app-commitments-page',
  imports: [RouterLink, IconComponent, ButtonDirective, SegmentedControlComponent, StatusPillComponent, AvatarComponent, CommitmentDrawerComponent],
  templateUrl: './commitments-page.component.html',
  styleUrl: './commitments-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitmentsPageComponent {
  private readonly seo = inject(SeoService);
  private readonly toast = inject(ToastService);
  private readonly data = inject(CommitmentsDataService);

  protected readonly commitments = toSignal(this.data.getCommitments(), { initialValue: [] });
  protected readonly filter = signal<CommitmentFilter>('all');
  protected readonly query = signal('');
  protected readonly selectedCommitment = signal<Commitment | null>(null);

  protected readonly filterOptions = computed<readonly SegmentedOption<CommitmentFilter>[]>(() => {
    const all = this.commitments();
    return [
      { value: 'all', label: 'All', count: all.length },
      { value: 'live', label: 'Live', count: all.filter((c) => c.status === 'live').length },
      { value: 'upcoming', label: 'Upcoming', count: all.filter((c) => c.status === 'upcoming').length },
      { value: 'done', label: 'Completed', count: all.filter((c) => c.status === 'done').length }
    ];
  });

  protected readonly filteredCommitments = computed(() => {
    const q = this.query().trim().toLowerCase();
    const f = this.filter();
    return this.commitments().filter((c) => {
      const matchesFilter = f === 'all' || c.status === f;
      const matchesQuery = !q || `${c.title} ${c.summary} ${c.cat}`.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  });

  constructor() {
    this.seo.setPage({
      title: 'Commitments',
      description: 'Every commitment, already understood — filter, search, and open the minutes.',
      path: '/app/commitments'
    });
  }

  protected openCommitment(commitment: Commitment): void {
    this.selectedCommitment.set(commitment);
  }

  protected closeDrawer(): void {
    this.selectedCommitment.set(null);
  }

  protected loadOlder(): void {
    this.toast.show('Loaded 20 older commitments');
  }
}
