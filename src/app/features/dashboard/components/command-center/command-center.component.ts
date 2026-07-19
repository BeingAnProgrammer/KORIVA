import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { DashboardDataService } from '../../../../data/services/dashboard-data.service';
import { BarChartComponent } from '../../../../shared/ui/bar-chart/bar-chart.component';
import { BarChartItem } from '../../../../shared/ui/bar-chart/bar-chart.model';
import { KpiCardComponent } from '../../../../shared/ui/kpi-card/kpi-card.component';
import { AiInsightsCardComponent } from '../ai-insights-card/ai-insights-card.component';
import { RecentMeetingsCardComponent } from '../recent-meetings-card/recent-meetings-card.component';
import { TeamActivityCardComponent } from '../team-activity-card/team-activity-card.component';
import { UpcomingListCardComponent } from '../upcoming-list-card/upcoming-list-card.component';

const MEETING_HOURS: readonly BarChartItem[] = [
  { value: 44 },
  { value: 60 },
  { value: 52 },
  { value: 76 },
  { value: 64, emphasis: true },
  { value: 90, emphasis: true },
  { value: 72, emphasis: true }
];

/** Dashboard "Command center" layout — KPI grid + recent/upcoming/insights/activity. */
@Component({
  selector: 'app-command-center',
  imports: [
    KpiCardComponent,
    RecentMeetingsCardComponent,
    BarChartComponent,
    UpcomingListCardComponent,
    AiInsightsCardComponent,
    TeamActivityCardComponent
  ],
  templateUrl: './command-center.component.html',
  styleUrl: './command-center.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandCenterComponent {
  private readonly data = inject(DashboardDataService);

  protected readonly kpis = toSignal(this.data.getKpis(), { initialValue: [] });
  protected readonly recentMeetings = toSignal(this.data.getRecentMeetings(), { initialValue: [] });
  protected readonly upcomingMeetings = toSignal(this.data.getUpcomingMeetings(), { initialValue: [] });
  protected readonly insights = toSignal(this.data.getInsights(), { initialValue: [] });
  protected readonly teamActivity = toSignal(this.data.getTeamActivity(), { initialValue: [] });
  protected readonly meetingHours = MEETING_HOURS;
}
