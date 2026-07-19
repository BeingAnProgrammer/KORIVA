import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SeoService } from '../../../core/services/seo.service';
import { SITE_URL } from '../../../core/constants/seo.constants';
import { AiShowcaseComponent } from '../components/ai-showcase/ai-showcase.component';
import { CtaBandComponent } from '../components/cta-band/cta-band.component';
import { FeaturesGridComponent } from '../components/features-grid/features-grid.component';
import { HeroLampComponent } from '../components/hero-lamp/hero-lamp.component';
import { MarketingFooterComponent } from '../components/marketing-footer/marketing-footer.component';
import { MarketingHeaderComponent } from '../components/marketing-header/marketing-header.component';
import { MeetingTypesGridComponent } from '../components/meeting-types-grid/meeting-types-grid.component';
import { StatsBandComponent } from '../components/stats-band/stats-band.component';

@Component({
  selector: 'app-landing-page',
  imports: [
    MarketingHeaderComponent,
    HeroLampComponent,
    FeaturesGridComponent,
    StatsBandComponent,
    MeetingTypesGridComponent,
    AiShowcaseComponent,
    CtaBandComponent,
    MarketingFooterComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    const description =
      'KORIVA joins your meetings, writes the minutes, tracks every commitment, and turns a year of conversations into a knowledge base you can simply ask.';

    this.seo.setPage({
      title: 'Meeting intelligence for teams that decide fast',
      description,
      path: '/'
    });

    this.seo.setStructuredData({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'KORIVA',
          url: SITE_URL,
          description
        },
        {
          '@type': 'SoftwareApplication',
          name: 'KORIVA',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description
        }
      ]
    });
  }
}
