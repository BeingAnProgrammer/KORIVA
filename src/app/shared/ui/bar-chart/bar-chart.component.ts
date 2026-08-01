import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { BarChartItem } from './bar-chart.model';

/** Monthly vertical bar chart — value label above, month label below. Ported from the reference's `.bars`. */
@Component({
  selector: 'app-bar-chart',
  template: `
    <div class="bar-chart" [style.height.px]="height()">
      @for (bar of bars(); track bar.label) {
        <div class="bar-chart__col">
          <span class="mono bar-chart__value">{{ bar.value }}</span>
          <i class="bar-chart__bar" [style.height.%]="percentOf(bar.value)"></i>
          <span class="mono bar-chart__label">{{ bar.label }}</span>
        </div>
      }
    </div>
  `,
  styles: `
    .bar-chart {
      display: flex;
      align-items: flex-end;
      gap: 14px;
    }

    .bar-chart__col {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;
      height: 100%;
    }

    .bar-chart__value {
      font-size: 12px;
      color: var(--ink-2);
    }

    .bar-chart__bar {
      width: 100%;
      border-radius: 8px 8px 3px 3px;
      background: linear-gradient(180deg, var(--accent), color-mix(in srgb, var(--accent) 55%, transparent));
      transition: height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .bar-chart__label {
      font-size: 11px;
      color: var(--ink-3);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent {
  readonly bars = input.required<readonly BarChartItem[]>();
  readonly height = input(200);

  private readonly max = computed(() => Math.max(...this.bars().map((b) => b.value), 1));

  protected percentOf(value: number): number {
    return Math.round((value / this.max()) * 100);
  }
}
