import { Directive, ElementRef, OnDestroy, afterNextRender, inject } from '@angular/core';
import gsap from 'gsap';

import { registerScrollTrigger } from '../../core/utils/gsap';

/**
 * Fades/slides an element in the first time it scrolls into view.
 * Unlike `.reveal` (which fires immediately on route mount), this is for
 * content further down a long page — e.g. the cinematic CTA band — that
 * should animate in as the user scrolls to it, not on initial paint.
 *
 * Uses gsap.matchMedia() so the reveal only ever runs under
 * `(prefers-reduced-motion: no-preference)` — if that condition doesn't
 * match (or later stops matching), the element simply keeps its normal,
 * fully-visible CSS state and no tween is created.
 */
@Directive({
  selector: '[appScrollReveal]'
})
export class ScrollRevealDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private matchMedia?: ReturnType<typeof gsap.matchMedia>;

  constructor() {
    afterNextRender(() => this.bind());
  }

  ngOnDestroy(): void {
    this.matchMedia?.revert();
  }

  private bind(): void {
    registerScrollTrigger();

    const element = this.elementRef.nativeElement;
    this.matchMedia = gsap.matchMedia();

    this.matchMedia.add('(prefers-reduced-motion: no-preference)', () => {
      const tween = gsap.from(element, {
        autoAlpha: 0,
        y: 28,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true
        }
      });

      return () => tween.scrollTrigger?.kill();
    });
  }
}
