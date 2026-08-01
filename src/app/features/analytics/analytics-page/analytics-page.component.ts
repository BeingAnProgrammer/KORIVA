import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { AnalyticsTabKey } from '../../../data/models/analytics-tab.model';
import { AnalyticsDataService } from '../../../data/services/analytics-data.service';
import { SeoService } from '../../../core/services/seo.service';
import { BarChartComponent } from '../../../shared/ui/bar-chart/bar-chart.component';
import { PercentageBarListComponent } from '../../../shared/ui/percentage-bar-list/percentage-bar-list.component';
import { SegmentedControlComponent } from '../../../shared/ui/segmented-control/segmented-control.component';
import { SegmentedOption } from '../../../shared/ui/segmented-control/segmented-option.model';

@Component({
  selector: 'app-analytics-page',
  imports: [SegmentedControlComponent, BarChartComponent, PercentageBarListComponent],
  templateUrl: './analytics-page.component.html',
  styleUrl: './analytics-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsPageComponent {
  private readonly seo = inject(SeoService);
  private readonly data = inject(AnalyticsDataService);

  protected readonly months = this.data.months;
  protected readonly tabs = toSignal(this.data.getAnalyticsTabs(), { initialValue: [] });
  protected readonly activeKey = signal<AnalyticsTabKey>('meetings');

  protected readonly tabOptions = computed<readonly SegmentedOption<AnalyticsTabKey>[]>(() =>
    this.tabs().map((t) => ({ value: t.key, label: t.label }))
  );

  protected readonly activeTab = computed(() => this.tabs().find((t) => t.key === this.activeKey()) ?? this.tabs()[0]);

  protected readonly chartBars = computed(() => {
    const tab = this.activeTab();
    return tab ? tab.monthlyValues.map((value, i) => ({ value, label: this.months[i] })) : [];
  });

  constructor() {
    this.seo.setPage({
      title: 'Analytics',
      description: 'Show me the evidence — meetings, decisions, and promises, measured.',
      path: '/app/analytics'
    });
  }
}
