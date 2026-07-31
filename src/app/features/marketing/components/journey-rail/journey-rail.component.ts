import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { JOURNEY_STAGES, JourneyService } from '../../../../core/services/journey.service';

/**
 * The page's persistent thread — a fixed left-edge rail (desktop) tracing
 * the journey stages, collapsing to a thin top progress line on narrower
 * viewports where there's no gutter for labels. Mounted once in
 * `landing-page.component.html`; every section reports into it via
 * `[appJourneyStage]`. Purely a step indicator driven by
 * `JourneyService.activeStageIndex` — no scroll-linked math of its own, so
 * there's nothing here that can desync from the page.
 */
@Component({
  selector: 'app-journey-rail',
  templateUrl: './journey-rail.component.html',
  styleUrl: './journey-rail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JourneyRailComponent {
  private readonly journey = inject(JourneyService);

  protected readonly stages = JOURNEY_STAGES;
  protected readonly activeIndex = this.journey.activeStageIndex;
  protected readonly fillPercent = computed(() => (this.activeIndex() / (this.stages.length - 1)) * 100);
}
