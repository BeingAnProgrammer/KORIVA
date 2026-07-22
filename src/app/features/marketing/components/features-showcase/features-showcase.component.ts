import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import gsap from 'gsap';

import { prefersReducedMotion } from '../../../../core/utils/gsap';
import { MarketingContentService } from '../../../../data/services/marketing-content.service';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { StaggerRevealDirective } from '../../../../shared/directives/stagger-reveal.directive';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { SectionEyebrowComponent } from '../../../../shared/ui/section-eyebrow/section-eyebrow.component';

const AUTO_ADVANCE_SECONDS = 5;

/**
 * The full platform capability set as a dashboard-style interactive
 * showcase — a compact nav-style list (echoing the real authenticated
 * app's sidebar) selects which capability fills the single preview panel
 * on the right. One bordered surface total, not nine identical cards.
 */
@Component({
  selector: 'app-features-showcase',
  imports: [ScrollRevealDirective, StaggerRevealDirective, IconComponent, SectionEyebrowComponent],
  templateUrl: './features-showcase.component.html',
  styleUrl: './features-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturesShowcaseComponent implements OnDestroy {
  private readonly content = inject(MarketingContentService);
  private readonly panelRef = viewChild.required('panelContent', { read: ElementRef });

  protected readonly features = toSignal(this.content.getShowcaseFeatures(), { initialValue: [] });
  protected readonly activeIndex = signal(0);
  protected readonly activeFeature = computed(() => this.features()[this.activeIndex()]);

  private autoAdvanceTimer?: ReturnType<typeof gsap.delayedCall>;

  constructor() {
    afterNextRender(() => this.scheduleAutoAdvance());
  }

  ngOnDestroy(): void {
    this.autoAdvanceTimer?.kill();
  }

  protected selectFeature(index: number): void {
    if (index === this.activeIndex()) {
      return;
    }
    this.crossfadeTo(index);
  }

  protected pauseAutoAdvance(): void {
    this.autoAdvanceTimer?.pause();
  }

  protected resumeAutoAdvance(): void {
    this.autoAdvanceTimer?.resume();
  }

  private scheduleAutoAdvance(): void {
    if (prefersReducedMotion()) {
      return;
    }

    this.autoAdvanceTimer = gsap.delayedCall(AUTO_ADVANCE_SECONDS, () => {
      const total = this.features().length;
      if (total > 0) {
        this.crossfadeTo((this.activeIndex() + 1) % total);
      }
      this.scheduleAutoAdvance();
    });
  }

  private crossfadeTo(index: number): void {
    if (prefersReducedMotion()) {
      this.activeIndex.set(index);
      return;
    }

    const panel = this.panelRef().nativeElement;

    gsap
      .timeline({ defaults: { ease: 'power2.out' } })
      .to(panel, { autoAlpha: 0, y: 6, duration: 0.18 })
      .call(() => this.activeIndex.set(index))
      .to(panel, { autoAlpha: 1, y: 0, duration: 0.3 });
  }
}
