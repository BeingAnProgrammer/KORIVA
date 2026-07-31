import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { DashboardDataService } from '../../../../data/services/dashboard-data.service';
import { KpiCardComponent } from '../../../../shared/ui/kpi-card/kpi-card.component';
import { AiInsightsCardComponent } from '../ai-insights-card/ai-insights-card.component';
import { IntelligenceFeedCardComponent } from '../intelligence-feed-card/intelligence-feed-card.component';
import { NeedsAttentionCardComponent } from '../needs-attention-card/needs-attention-card.component';
import { RecentMeetingsCardComponent } from '../recent-meetings-card/recent-meetings-card.component';
import { UpcomingListCardComponent } from '../upcoming-list-card/upcoming-list-card.component';

/** Dashboard V2 layout — Workspace Snapshot, the signature Recent Intelligence
 *  feed, then a 2-column area (meetings + attention | upcoming + insights). */
@Component({
  selector: 'app-command-center',
  imports: [
    KpiCardComponent,
    IntelligenceFeedCardComponent,
    RecentMeetingsCardComponent,
    NeedsAttentionCardComponent,
    UpcomingListCardComponent,
    AiInsightsCardComponent
  ],
  templateUrl: './command-center.component.html',
  styleUrl: './command-center.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandCenterComponent {
  private readonly data = inject(DashboardDataService);

  protected readonly kpis = toSignal(this.data.getKpis(), { initialValue: [] });
  protected readonly intelligenceFeed = toSignal(this.data.getIntelligenceFeed(), { initialValue: [] });
  protected readonly recentMeetings = toSignal(this.data.getRecentMeetings(), { initialValue: [] });
  protected readonly needsAttention = toSignal(this.data.getNeedsAttention(), { initialValue: [] });
  protected readonly upcomingMeetings = toSignal(this.data.getUpcomingMeetings(), { initialValue: [] });
  protected readonly insights = toSignal(this.data.getInsights(), { initialValue: [] });
}
