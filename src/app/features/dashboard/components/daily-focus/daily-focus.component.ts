import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { DashboardDataService } from '../../../../data/services/dashboard-data.service';
import { KpiCompactTileComponent } from '../../../../shared/ui/kpi-compact-tile/kpi-compact-tile.component';
import { AiInsightsCardComponent } from '../ai-insights-card/ai-insights-card.component';
import { NextUpCardComponent } from '../next-up-card/next-up-card.component';
import { TeamActivityCardComponent } from '../team-activity-card/team-activity-card.component';
import { TodayTomorrowTimelineComponent } from '../today-tomorrow-timeline/today-tomorrow-timeline.component';

/** Dashboard "Daily focus" layout — next-up hero + compact KPIs + timeline + activity. */
@Component({
  selector: 'app-daily-focus',
  imports: [NextUpCardComponent, AiInsightsCardComponent, KpiCompactTileComponent, TodayTomorrowTimelineComponent, TeamActivityCardComponent],
  templateUrl: './daily-focus.component.html',
  styleUrl: './daily-focus.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyFocusComponent {
  private readonly data = inject(DashboardDataService);

  protected readonly kpis = toSignal(this.data.getKpis(), { initialValue: [] });
  protected readonly insights = toSignal(this.data.getInsights(), { initialValue: [] });
  protected readonly upcomingMeetings = toSignal(this.data.getUpcomingMeetings(), { initialValue: [] });
  protected readonly teamActivity = toSignal(this.data.getTeamActivity(), { initialValue: [] });
}
