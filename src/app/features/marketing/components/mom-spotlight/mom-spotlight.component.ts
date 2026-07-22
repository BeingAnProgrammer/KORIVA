import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { StaggerRevealDirective } from '../../../../shared/directives/stagger-reveal.directive';
import { AvatarComponent } from '../../../../shared/ui/avatar/avatar.component';
import { ChipComponent } from '../../../../shared/ui/chip/chip.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { SectionEyebrowComponent } from '../../../../shared/ui/section-eyebrow/section-eyebrow.component';

/**
 * The deep-dive on AI-generated MOM — the one feature this landing page
 * previously had no dedicated section for. Copy/mock document content is
 * a single illustrative instance, hand-authored like the hero/CTA copy.
 */
@Component({
  selector: 'app-mom-spotlight',
  imports: [ScrollRevealDirective, StaggerRevealDirective, AvatarComponent, ChipComponent, IconComponent, SectionEyebrowComponent],
  templateUrl: './mom-spotlight.component.html',
  styleUrl: './mom-spotlight.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MomSpotlightComponent {}
