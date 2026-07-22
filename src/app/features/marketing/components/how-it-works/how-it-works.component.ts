import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MarketingContentService } from '../../../../data/services/marketing-content.service';
import { StaggerRevealDirective } from '../../../../shared/directives/stagger-reveal.directive';
import { AvatarComponent } from '../../../../shared/ui/avatar/avatar.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { SectionEyebrowComponent } from '../../../../shared/ui/section-eyebrow/section-eyebrow.component';
import { StatusPillComponent } from '../../../../shared/ui/status-pill/status-pill.component';

/** The 3-beat capture → structure → recall pipeline — a fast visual answer to "what does this do". */
@Component({
  selector: 'app-how-it-works',
  imports: [StaggerRevealDirective, AvatarComponent, IconComponent, SectionEyebrowComponent, StatusPillComponent],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowItWorksComponent {
  private readonly content = inject(MarketingContentService);

  protected readonly steps = toSignal(this.content.getPipelineSteps(), { initialValue: [] });
}
