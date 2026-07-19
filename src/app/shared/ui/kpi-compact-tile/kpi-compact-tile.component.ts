import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Kpi } from '../../../data/models/kpi.model';
import { IconComponent } from '../icon/icon.component';

/** Compact horizontal KPI tile — daily-focus view + Analytics page. */
@Component({
  selector: 'app-kpi-compact-tile',
  imports: [IconComponent],
  templateUrl: './kpi-compact-tile.component.html',
  styleUrl: './kpi-compact-tile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpiCompactTileComponent {
  readonly kpi = input.required<Kpi>();
}
