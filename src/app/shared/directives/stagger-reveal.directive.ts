import { Directive, ElementRef, OnDestroy, afterNextRender, inject } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { prefersReducedMotion, registerScrollTrigger } from '../../core/utils/gsap';

/**
 * Reveals a grid/list's direct children with a grid-aware wave the first
 * time the container scrolls into view — used for the features grid and
 * stats band, where `appScrollReveal`'s single-element fade isn't enough.
 */
@Directive({
  selector: '[appStaggerReveal]'
})
export class StaggerRevealDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private scrollTrigger?: ScrollTrigger;

  constructor() {
    afterNextRender(() => this.bind());
  }

  ngOnDestroy(): void {
    this.scrollTrigger?.kill();
  }

  private bind(): void {
    const children = Array.from(this.elementRef.nativeElement.children);

    if (!children.length || prefersReducedMotion()) {
      return;
    }

    registerScrollTrigger();

    const tween = gsap.from(children, {
      autoAlpha: 0,
      y: 16,
      duration: 0.4,
      ease: 'power2.out',
      stagger: { each: 0.06, from: 'start', grid: 'auto' },
      scrollTrigger: {
        trigger: this.elementRef.nativeElement,
        start: 'top 85%',
        once: true
      }
    });

    this.scrollTrigger = tween.scrollTrigger;
  }
}
