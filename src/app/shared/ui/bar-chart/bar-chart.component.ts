import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BarChartItem } from './bar-chart.model';

/** Simple vertical bar chart primitive — ported from the dashboard's "Meeting hours" chart. */
@Component({
  selector: 'app-bar-chart',
  template: `
    <div class="bar-chart" [style.height.px]="height()">
      @for (bar of bars(); track $index) {
        <div class="bar-chart__bar" [style.height.%]="bar.value" [class.bar-chart__bar--emphasis]="bar.emphasis"></div>
      }
    </div>
  `,
  styles: `
    .bar-chart {
      display: flex;
      align-items: flex-end;
      gap: 14px;
    }

    .bar-chart__bar {
      flex: 1;
      background: var(--accent-soft);
      border-radius: var(--radius-xs) var(--radius-xs) 0 0;

      &--emphasis {
        background: var(--accent);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent {
  readonly bars = input.required<readonly BarChartItem[]>();
  readonly height = input(160);
}
