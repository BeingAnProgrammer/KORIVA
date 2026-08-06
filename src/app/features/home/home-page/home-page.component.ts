import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';
import { ToastService } from '../../../core/services/toast.service';
import { CommitmentsDataService } from '../../../data/services/commitments-data.service';
import { HomeDataService } from '../../../data/services/home-data.service';
import { PatternsDataService } from '../../../data/services/patterns-data.service';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { AiSearchHeroComponent } from '../components/ai-search-hero/ai-search-hero.component';
import { LiveMeetingPanelComponent } from '../components/live-meeting-panel/live-meeting-panel.component';

@Component({
  selector: 'app-home-page',
  imports: [AiSearchHeroComponent, LiveMeetingPanelComponent, RouterLink, IconComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  private readonly seo = inject(SeoService);
  private readonly toast = inject(ToastService);
  private readonly homeData = inject(HomeDataService);
  private readonly commitmentsData = inject(CommitmentsDataService);
  private readonly patternsData = inject(PatternsDataService);

  protected readonly liveMeeting = toSignal(this.homeData.getLiveMeeting(), { requireSync: true });
  protected readonly briefing = toSignal(this.homeData.getMorningBriefing(), { requireSync: true });
  protected readonly todayFocusItems = toSignal(this.homeData.getTodayFocusItems(), { initialValue: [] });
  protected readonly meetings = toSignal(this.commitmentsData.getCommitments(), { initialValue: [] });
  protected readonly patterns = toSignal(this.patternsData.getPatterns(), { initialValue: [] });

  protected readonly liveMeetingRow = computed(() => this.meetings().find((m) => m.status === 'live'));
  protected readonly nextUpcomingMeeting = computed(() => this.meetings().find((m) => m.status === 'upcoming'));
  protected readonly patternsPreview = computed(() => this.patterns().slice(0, 3));

  protected readonly restOfTodayFiledNote = this.homeData.restOfTodayFiledNote;
  protected readonly restOfTodayFiledTitles = this.homeData.restOfTodayFiledTitles;

  constructor() {
    this.seo.setPage({
      title: 'Home',
      description: 'Ask Koriva anything that was ever said in a meeting, and see what needs you today.',
      path: '/app/home'
    });
  }

  protected onFocusCta(ctaLabel: string): void {
    this.toast.show(`${ctaLabel} — Koriva is on it`);
  }
}
