import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';
import gsap from 'gsap';

import { registerScrollTrigger } from '../../core/utils/gsap';

/**
 * Counts a stat's numeric prefix up from 0 when it scrolls into view —
 * "24/7" counts the "24" and keeps "/7" static, "10+" counts "10" and keeps
 * "+", a value with no leading digits (rare) just renders as-is. Same
 * `matchMedia('prefers-reduced-motion: no-preference')` gate as
 * `scroll-reveal.directive.ts`; under reduced motion the final value shows
 * immediately instead of counting.
 */
@Directive({
  selector: '[appCountUp]'
})
export class CountUpDirective implements OnDestroy {
  readonly appCountUp = input.required<string>();

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private matchMedia?: ReturnType<typeof gsap.matchMedia>;

  constructor() {
    afterNextRender(() => this.bind());
  }

  ngOnDestroy(): void {
    this.matchMedia?.revert();
  }

  private bind(): void {
    const raw = this.appCountUp();
    const element = this.elementRef.nativeElement;
    const match = raw.match(/^(\d+)(.*)$/);

    if (!match) {
      element.textContent = raw;
      return;
    }

    const [, digits, suffix] = match;
    const target = Number(digits);

    registerScrollTrigger();
    this.matchMedia = gsap.matchMedia();

    this.matchMedia.add('(prefers-reduced-motion: no-preference)', () => {
      element.textContent = `0${suffix}`;
      const counter = { value: 0 };

      const tween = gsap.to(counter, {
        value: target,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: () => {
          element.textContent = `${Math.round(counter.value)}${suffix}`;
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true
        }
      });

      return () => tween.scrollTrigger?.kill();
    });

    this.matchMedia.add('(prefers-reduced-motion: reduce)', () => {
      element.textContent = raw;
    });
  }
}
