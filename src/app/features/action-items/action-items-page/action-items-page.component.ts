import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SeoService } from '../../../core/services/seo.service';
import { ActionItemsDataService } from '../../../data/services/action-items-data.service';
import { ActionItemsTableComponent } from '../../../shared/ui/action-items-table/action-items-table.component';

interface SummaryTile {
  value: string;
  label: string;
  color: string;
}

const SUMMARY_TILES: readonly SummaryTile[] = [
  { value: '17', label: 'Open', color: 'var(--ink)' },
  { value: '6', label: 'In progress', color: 'var(--ochre)' },
  { value: '3', label: 'Overdue', color: 'var(--rust)' },
  { value: '128', label: 'Completed', color: 'var(--accent)' }
];

@Component({
  selector: 'app-action-items-page',
  imports: [ActionItemsTableComponent],
  templateUrl: './action-items-page.component.html',
  styleUrl: './action-items-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionItemsPageComponent {
  private readonly seo = inject(SeoService);
  private readonly data = inject(ActionItemsDataService);

  protected readonly actionItems = toSignal(this.data.getActionItems(), { initialValue: [] });
  protected readonly summaryTiles = SUMMARY_TILES;

  constructor() {
    this.seo.setPage({
      title: 'Action items',
      description: 'Every commitment extracted from your meetings, tracked to done.',
      path: '/app/action-items'
    });
  }
}
