import { Directive, ElementRef, NgZone, OnDestroy, afterNextRender, inject } from '@angular/core';

const STRENGTH = 0.35;

/**
 * "Magnetic" cursor-follow hover — the element nudges toward the pointer
 * while hovered, then eases back on release. Pure CSS transform + a
 * pointermove listener (no animation library): the transition is disabled
 * while actively tracking the pointer for instant follow, and re-enabled
 * only on pointerleave for the springy return.
 */
@Directive({ selector: '[appMagnetic]' })
export class MagneticHoverDirective implements OnDestroy {
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

    const handlePointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transition = 'none';
      element.style.transform = `translate(${x * STRENGTH}px, ${y * STRENGTH}px)`;
    };

    const handlePointerLeave = () => {
      element.style.transition = 'transform var(--dur-slower) var(--ease-spring)';
      element.style.transform = '';
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
