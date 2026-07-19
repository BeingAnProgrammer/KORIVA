import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SeoService } from '../../../core/services/seo.service';
import { AnalyticsDataService } from '../../../data/services/analytics-data.service';
import { BarChartComponent } from '../../../shared/ui/bar-chart/bar-chart.component';
import { BarChartItem } from '../../../shared/ui/bar-chart/bar-chart.model';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { KpiCardComponent } from '../../../shared/ui/kpi-card/kpi-card.component';
import { PercentageBarListComponent } from '../../../shared/ui/percentage-bar-list/percentage-bar-list.component';

const MEETING_PRODUCTIVITY: readonly BarChartItem[] = [
  { value: 40 },
  { value: 55 },
  { value: 48 },
  { value: 70 },
  { value: 62, emphasis: true },
  { value: 85, emphasis: true },
  { value: 74, emphasis: true },
  { value: 92, emphasis: true }
];

@Component({
  selector: 'app-analytics-page',
  imports: [IconComponent, KpiCardComponent, BarChartComponent, PercentageBarListComponent],
  templateUrl: './analytics-page.component.html',
  styleUrl: './analytics-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsPageComponent {
  private readonly seo = inject(SeoService);
  private readonly data = inject(AnalyticsDataService);

  protected readonly kpis = toSignal(this.data.getKpis(), { initialValue: [] });
  private readonly categoryStats = toSignal(this.data.getCategoryStats(), { initialValue: [] });
  protected readonly categoryBars = computed(() =>
    this.categoryStats().map((stat) => ({ label: stat.name, percentage: stat.percentage, color: stat.color }))
  );
  protected readonly teamContributions = toSignal(this.data.getTeamContributions(), { initialValue: [] });
  protected readonly meetingProductivity = MEETING_PRODUCTIVITY;

  constructor() {
    this.seo.setPage({
      title: 'Analytics',
      description: 'Hours, cadence, participation, and follow-through, measured.',
      path: '/app/analytics'
    });
  }
}
