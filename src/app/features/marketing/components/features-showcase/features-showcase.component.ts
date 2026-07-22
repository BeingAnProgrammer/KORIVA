import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MarketingContentService } from '../../../../data/services/marketing-content.service';
import { StaggerRevealDirective } from '../../../../shared/directives/stagger-reveal.directive';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { SectionEyebrowComponent } from '../../../../shared/ui/section-eyebrow/section-eyebrow.component';

/**
 * The full platform capability set as a bento grid — two featured tiles
 * (larger) for capabilities that get their own deep-dive section further
 * down the page, seven standard tiles for everything else. Replaces the
 * old identical-card grid; the fix is the varied format, not the content.
 */
@Component({
  selector: 'app-features-showcase',
  imports: [StaggerRevealDirective, IconComponent, SectionEyebrowComponent],
  templateUrl: './features-showcase.component.html',
  styleUrl: './features-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturesShowcaseComponent {
  private readonly content = inject(MarketingContentService);

  protected readonly features = toSignal(this.content.getShowcaseFeatures(), { initialValue: [] });
}
