import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';

import { SeoService } from '../../../core/services/seo.service';
import { MeetingTabKey } from '../../../data/models/meeting-tab.model';
import { MeetingDetailHeaderComponent } from '../components/meeting-detail-header/meeting-detail-header.component';
import { MeetingTabsStripComponent } from '../components/meeting-tabs-strip/meeting-tabs-strip.component';
import { MeetingActionsTabComponent } from '../components/tabs/meeting-actions-tab/meeting-actions-tab.component';
import { MeetingAiTabComponent } from '../components/tabs/meeting-ai-tab/meeting-ai-tab.component';
import { MeetingAnalyticsTabComponent } from '../components/tabs/meeting-analytics-tab/meeting-analytics-tab.component';
import { MomTabComponent } from '../components/tabs/mom-tab/mom-tab.component';
import { OverviewTabComponent } from '../components/tabs/overview-tab/overview-tab.component';
import { RecordingTabComponent } from '../components/tabs/recording-tab/recording-tab.component';
import { TranscriptTabComponent } from '../components/tabs/transcript-tab/transcript-tab.component';

const VALID_TABS: readonly MeetingTabKey[] = ['overview', 'transcript', 'mom', 'recording', 'analytics', 'actions', 'ai'];

/** Meeting detail page — header, tab strip, and the 7 tab panels. */
@Component({
  selector: 'app-meeting-detail-page',
  imports: [
    MeetingDetailHeaderComponent,
    MeetingTabsStripComponent,
    OverviewTabComponent,
    TranscriptTabComponent,
    MomTabComponent,
    RecordingTabComponent,
    MeetingAnalyticsTabComponent,
    MeetingActionsTabComponent,
    MeetingAiTabComponent
  ],
  templateUrl: './meeting-detail-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingDetailPageComponent {
  private readonly seo = inject(SeoService);

  readonly id = input.required<string>();
  readonly tab = input<string>('overview');

  protected readonly activeTab = computed<MeetingTabKey>(() => {
    const value = this.tab();
    return (VALID_TABS as readonly string[]).includes(value) ? (value as MeetingTabKey) : 'overview';
  });

  constructor() {
    effect(() => {
      this.seo.setPage({
        title: 'Q3 sales review',
        description: 'Minutes, transcript, recording, and action items for this meeting.',
        path: `/app/meetings/${this.id()}`
      });
    });
  }
}
