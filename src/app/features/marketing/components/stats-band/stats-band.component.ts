import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MarketingContentService } from '../../../../data/services/marketing-content.service';
import { StaggerRevealDirective } from '../../../../shared/directives/stagger-reveal.directive';
import { SectionEyebrowComponent } from '../../../../shared/ui/section-eyebrow/section-eyebrow.component';

/** Landing page stats band. */
@Component({
  selector: 'app-stats-band',
  imports: [StaggerRevealDirective, SectionEyebrowComponent],
  templateUrl: './stats-band.component.html',
  styleUrl: './stats-band.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsBandComponent {
  private readonly content = inject(MarketingContentService);

  protected readonly stats = toSignal(this.content.getStats(), { initialValue: [] });
}
