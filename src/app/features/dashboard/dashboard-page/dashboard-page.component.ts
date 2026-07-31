import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SeoService } from '../../../core/services/seo.service';
import { AiSearchHeroComponent } from '../components/ai-search-hero/ai-search-hero.component';
import { CommandCenterComponent } from '../components/command-center/command-center.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [AiSearchHeroComponent, CommandCenterComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setPage({
      title: 'Dashboard',
      description: 'Ask Koriva anything across your meetings, and see what needs attention.',
      path: '/app/dashboard'
    });
  }
}
