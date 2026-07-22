import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { MarketingContentService } from '../../../../data/services/marketing-content.service';
import { GlowBorderDirective } from '../../../../shared/directives/glow-border.directive';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { MarqueeComponent } from '../../../../shared/ui/marquee/marquee.component';
import { SectionEyebrowComponent } from '../../../../shared/ui/section-eyebrow/section-eyebrow.component';

/** Landing page meeting-types row — a horizontally scrolling marquee (per user request). */
@Component({
  selector: 'app-meeting-types-grid',
  imports: [RouterLink, GlowBorderDirective, ScrollRevealDirective, IconComponent, SectionEyebrowComponent, MarqueeComponent],
  templateUrl: './meeting-types-grid.component.html',
  styleUrl: './meeting-types-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingTypesGridComponent {
  private readonly content = inject(MarketingContentService);

  protected readonly meetingTypes = toSignal(this.content.getMeetingTypes(), { initialValue: [] });
}
