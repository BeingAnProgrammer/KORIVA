import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { JourneyService } from '../../core/services/journey.service';
import { registerScrollTrigger } from '../../core/utils/gsap';

/**
 * Marks a section as one beat of the landing page's journey arc — while its
 * midpoint crosses the viewport center, it reports its index to
 * `JourneyService` so the journey rail highlights the matching stage. Runs
 * unconditionally (no reduced-motion gate): this only ever toggles a
 * highlighted label, it never animates the section itself.
 */
@Directive({
  selector: '[appJourneyStage]'
})
export class JourneyStageDirective implements OnDestroy {
  readonly appJourneyStage = input.required<number>();

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly journey = inject(JourneyService);
  private trigger?: ScrollTrigger;

  constructor() {
    afterNextRender(() => this.bind());
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
  }

  private bind(): void {
    registerScrollTrigger();

    const index = this.appJourneyStage();

    this.trigger = ScrollTrigger.create({
      trigger: this.elementRef.nativeElement,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => {
        if (self.isActive) {
          this.journey.setActiveStage(index);
        }
      }
    });
  }
}
