import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { Kpi } from '../../../data/models/kpi.model';
import { IconComponent } from '../icon/icon.component';

/** Dashboard/Analytics KPI tile — ported verbatim from the handoff markup. */
@Component({
  selector: 'app-kpi-card',
  imports: [IconComponent],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpiCardComponent {
  readonly kpi = input.required<Kpi>();
  /** Analytics page reuses this card without the icon and with a smaller value size. */
  readonly showIcon = input(true);
  readonly valueSize = input<'3xl' | '4xl'>('4xl');

  protected readonly deltaColor = computed(() => {
    switch (this.kpi().deltaType) {
      case 'up':
        return 'var(--accent)';
      case 'warn':
        return 'var(--rust)';
      default:
        return 'var(--ink-3)';
    }
  });
}
