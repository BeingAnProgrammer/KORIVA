import { Directive, ElementRef, OnDestroy, afterNextRender, inject } from '@angular/core';
import gsap from 'gsap';

import { registerScrollTrigger } from '../../core/utils/gsap';

/**
 * Reveals a grid/list's direct children with a grid-aware wave the first
 * time the container scrolls into view — used for the features grid and
 * stats band, where `appScrollReveal`'s single-element fade isn't enough.
 *
 * Uses gsap.matchMedia() so the stagger only ever runs under
 * `(prefers-reduced-motion: no-preference)` — see ScrollRevealDirective.
 */
@Directive({
  selector: '[appStaggerReveal]'
})
export class StaggerRevealDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private matchMedia?: ReturnType<typeof gsap.matchMedia>;

  constructor() {
    afterNextRender(() => this.bind());
  }

  ngOnDestroy(): void {
    this.matchMedia?.revert();
  }

  private bind(): void {
    const element = this.elementRef.nativeElement;
    const children = Array.from(element.children);

    if (!children.length) {
      return;
    }

    registerScrollTrigger();

    this.matchMedia = gsap.matchMedia();

    this.matchMedia.add('(prefers-reduced-motion: no-preference)', () => {
      const tween = gsap.from(children, {
        autoAlpha: 0,
        y: 16,
        duration: 0.4,
        ease: 'power2.out',
        stagger: { each: 0.06, from: 'start', grid: 'auto' },
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
