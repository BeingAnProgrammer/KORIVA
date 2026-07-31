import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MarketingContentService } from '../../../../data/services/marketing-content.service';
import { CountUpDirective } from '../../../../shared/directives/count-up.directive';
import { StaggerRevealDirective } from '../../../../shared/directives/stagger-reveal.directive';
import { SectionEyebrowComponent } from '../../../../shared/ui/section-eyebrow/section-eyebrow.component';

/**
 * Landing page stats band — one large hero stat (the closing "24/7," brand
 * indigo) spanning the full column height, three standard stats stacked
 * beside it, instead of four equal columns. Each value counts up from 0 on
 * scroll-in via `appCountUp`.
 */
@Component({
  selector: 'app-stats-band',
  imports: [StaggerRevealDirective, CountUpDirective, SectionEyebrowComponent],
  templateUrl: './stats-band.component.html',
  styleUrl: './stats-band.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsBandComponent {
  private readonly content = inject(MarketingContentService);

  protected readonly stats = toSignal(this.content.getStats(), { initialValue: [] });
}
