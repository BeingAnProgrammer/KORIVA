import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MarketingContentService } from '../../../../data/services/marketing-content.service';
import { JourneyStageDirective } from '../../../../shared/directives/journey-stage.directive';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { StaggerRevealDirective } from '../../../../shared/directives/stagger-reveal.directive';
import { TiltHoverDirective } from '../../../../shared/directives/tilt-hover.directive';
import { SectionEyebrowComponent } from '../../../../shared/ui/section-eyebrow/section-eyebrow.component';

/**
 * Named grid-template-areas, indexed to match `SHOWCASE_FEATURES`'
 * position — the two flagship AI capabilities (indices 2 and 6: AI
 * knowledge search, AI agents) land on `spot1`/`spot2`, the enlarged 2×2
 * cells; everything else is a standard 1×1 cell. See the .scss for the
 * actual area layout.
 */
const GRID_AREAS: readonly string[] = ['f1', 'f2', 'spot1', 'f3', 'f4', 'f5', 'spot2', 'f6', 'f7'];
const SPOTLIGHT_INDICES = new Set([2, 6]);

/**
 * `SHOWCASE_FEATURES`' `icon` field still carries its original Lucide name
 * (kept as a stable identifier so this map is the only thing that needs to
 * change if the artwork is swapped again) — mapped here to the custom 3D
 * icon supplied for each tile, under `public/icons/features/`.
 */
const ICON_IMAGE_MAP: Readonly<Record<string, string>> = {
  'layout-template': 'multi-meeting-templates.png',
  video: 'meeting-recording.png',
  sparkles: 'ai-knowledge-search.png',
  'calendar-days': 'meeting-scheduling.png',
  'bar-chart-3': 'meeting-analytics.png',
  'square-check-big': 'commitment-tracking.png',
  bot: 'ai-agents.png',
  download: 'export-pdf-docx.png',
  library: 'organizational-knowledge-base.png'
};

/**
 * The platform capability set as a real bento grid — all 9 visible at
 * once, two enlarged for the flagship AI features — replacing the former
 * sidebar-list-plus-single-panel pattern (which was the flattest, most
 * "just a dashboard" -looking section on the page). Hierarchy now comes
 * from tile size and position first, the per-feature story-hue tint second.
 */
@Component({
  selector: 'app-features-showcase',
  imports: [ScrollRevealDirective, StaggerRevealDirective, JourneyStageDirective, TiltHoverDirective, SectionEyebrowComponent],
  templateUrl: './features-showcase.component.html',
  styleUrl: './features-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturesShowcaseComponent {
  private readonly content = inject(MarketingContentService);

  protected readonly features = toSignal(this.content.getShowcaseFeatures(), { initialValue: [] });

  protected areaFor(index: number): string {
    return GRID_AREAS[index] ?? 'auto';
  }

  protected isSpotlight(index: number): boolean {
    return SPOTLIGHT_INDICES.has(index);
  }

  protected iconSrc(icon: string): string {
    return 'icons/features/' + (ICON_IMAGE_MAP[icon] ?? '');
  }
}
