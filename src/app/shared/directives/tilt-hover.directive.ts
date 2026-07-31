import { Directive, ElementRef, NgZone, OnDestroy, afterNextRender, inject, input } from '@angular/core';

const DEFAULT_MAX_TILT_DEG = 8;

/**
 * Subtle 3D perspective tilt toward the pointer — used sparingly (the hero's
 * floating call panel, the recall bento's supporting tiles) so it reads as
 * a signature interaction rather than a tic applied everywhere. Same shape
 * as `magnetic-hover.directive.ts`: pure DOM transform + pointermove, no
 * animation library, transition disabled while actively tracking for
 * instant follow and re-enabled only on pointerleave for the springy reset.
 */
@Directive({ selector: '[appTilt]' })
export class TiltHoverDirective implements OnDestroy {
  /** Max rotation in degrees at the element's edge. */
  readonly appTilt = input<number>(DEFAULT_MAX_TILT_DEG);

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly ngZone = inject(NgZone);
  private unlisten?: () => void;

  constructor() {
    afterNextRender(() => this.bind());
  }

  ngOnDestroy(): void {
    this.unlisten?.();
  }

  private bind(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || prefersCoarsePointer) {
      return;
    }

    const element = this.elementRef.nativeElement;
    const maxDeg = this.appTilt() || DEFAULT_MAX_TILT_DEG;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      element.style.transition = 'none';
      element.style.transform = `perspective(900px) rotateX(${(-py * maxDeg).toFixed(2)}deg) rotateY(${(px * maxDeg).toFixed(2)}deg)`;
    };

    const handlePointerLeave = () => {
      element.style.transition = 'transform var(--dur-slower) var(--ease-spring)';
      element.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    };

    this.ngZone.runOutsideAngular(() => {
      element.addEventListener('pointermove', handlePointerMove);
      element.addEventListener('pointerleave', handlePointerLeave);
      this.unlisten = () => {
        element.removeEventListener('pointermove', handlePointerMove);
        element.removeEventListener('pointerleave', handlePointerLeave);
      };
    });
  }
}
