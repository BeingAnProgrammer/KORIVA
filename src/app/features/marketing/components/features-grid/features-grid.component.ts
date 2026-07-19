import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MarketingContentService } from '../../../../data/services/marketing-content.service';
import { GlowBorderDirective } from '../../../../shared/directives/glow-border.directive';
import { ChipComponent } from '../../../../shared/ui/chip/chip.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { SectionEyebrowComponent } from '../../../../shared/ui/section-eyebrow/section-eyebrow.component';

/** Landing page features grid — lead card + 9 feature cards, ported verbatim. */
@Component({
  selector: 'app-features-grid',
  imports: [GlowBorderDirective, ChipComponent, IconComponent, SectionEyebrowComponent],
  templateUrl: './features-grid.component.html',
  styleUrl: './features-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturesGridComponent {
  private readonly content = inject(MarketingContentService);

  protected readonly featureLead = toSignal(this.content.getFeatureLead());
  protected readonly featureCards = toSignal(this.content.getFeatureCards(), { initialValue: [] });
}
