import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { MarketingContentService } from '../../../../data/services/marketing-content.service';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { MarqueeComponent } from '../../../../shared/ui/marquee/marquee.component';
import { SectionEyebrowComponent } from '../../../../shared/ui/section-eyebrow/section-eyebrow.component';

/**
 * Landing page meeting-types row — two counter-scrolling marquee rows
 * (split evenly from the same list) instead of one, for a denser "wall of
 * templates" feel than a single strip gives.
 */
@Component({
  selector: 'app-meeting-types-grid',
  imports: [RouterLink, ScrollRevealDirective, IconComponent, SectionEyebrowComponent, MarqueeComponent],
  templateUrl: './meeting-types-grid.component.html',
  styleUrl: './meeting-types-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingTypesGridComponent {
  private readonly content = inject(MarketingContentService);

  protected readonly meetingTypes = toSignal(this.content.getMeetingTypes(), { initialValue: [] });

  protected readonly topRow = computed(() => {
    const all = this.meetingTypes();
    return all.slice(0, Math.ceil(all.length / 2));
  });

  protected readonly bottomRow = computed(() => {
    const all = this.meetingTypes();
    return all.slice(Math.ceil(all.length / 2));
  });
}
