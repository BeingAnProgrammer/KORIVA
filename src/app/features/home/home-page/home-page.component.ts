import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SeoService } from '../../../core/services/seo.service';
import { HomeDataService } from '../../../data/services/home-data.service';
import { AiSearchHeroComponent } from '../components/ai-search-hero/ai-search-hero.component';
import { LiveMeetingPanelComponent } from '../components/live-meeting-panel/live-meeting-panel.component';

@Component({
  selector: 'app-home-page',
  imports: [AiSearchHeroComponent, LiveMeetingPanelComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  private readonly seo = inject(SeoService);
  private readonly homeData = inject(HomeDataService);

  protected readonly liveMeeting = toSignal(this.homeData.getLiveMeeting(), { requireSync: true });

  constructor() {
    this.seo.setPage({
      title: 'Home',
      description: 'Ask Koriva anything that was ever said in a meeting, and see what needs you today.',
      path: '/app/home'
    });
  }
}
