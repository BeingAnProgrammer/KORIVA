import { Directive, ElementRef, OnDestroy, afterNextRender, inject } from '@angular/core';

/**
 * Fades/slides an element in the first time it scrolls into view.
 * Unlike `.reveal` (which fires immediately on route mount), this is for
 * content further down a long page — e.g. the cinematic CTA band — that
 * should animate in as the user scrolls to it, not on initial paint.
 */
@Directive({
  selector: '[appScrollReveal]',
  host: { class: 'scroll-reveal' }
})
export class ScrollRevealDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => this.bind());
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private bind(): void {
    const element = this.elementRef.nativeElement;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.classList.add('scroll-reveal--visible');
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.2 }
    );

    this.observer.observe(element);
  }
}
