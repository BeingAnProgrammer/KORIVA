import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MarketingContentService } from '../../../../data/services/marketing-content.service';
import { GlowBorderDirective } from '../../../../shared/directives/glow-border.directive';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { SectionEyebrowComponent } from '../../../../shared/ui/section-eyebrow/section-eyebrow.component';

/** Landing page meeting-types grid — ported verbatim. */
@Component({
  selector: 'app-meeting-types-grid',
  imports: [GlowBorderDirective, IconComponent, SectionEyebrowComponent],
  templateUrl: './meeting-types-grid.component.html',
  styleUrl: './meeting-types-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingTypesGridComponent {
  private readonly content = inject(MarketingContentService);

  protected readonly meetingTypes = toSignal(this.content.getMeetingTypes(), { initialValue: [] });
}
