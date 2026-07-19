import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, NgZone, OnDestroy, afterNextRender, inject } from '@angular/core';

const PROXIMITY_PX = 70;
const INACTIVE_ZONE_RATIO = 0.01;

/**
 * Pointer-tracked conic-gradient glow ring for landing-page cards, ported
 * from the design's `bindGlow()` (a single document-level `pointermove`
 * listener driving CSS custom properties `--start`/`--active` per element).
 * Pairs with the `.glow-border` styles in `styles/_utilities.scss`.
 */
@Directive({
  selector: '[appGlowBorder]',
  host: { class: 'glow-border' }
})
export class GlowBorderDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly document = inject(DOCUMENT);
  private readonly ngZone = inject(NgZone);
  private unlisten?: () => void;

  constructor() {
    afterNextRender(() => this.bind());
  }

  ngOnDestroy(): void {
    this.unlisten?.();
  }

  private bind(): void {
    const handlePointerMove = (event: PointerEvent) => {
      const element = this.elementRef.nativeElement;
      const rect = element.getBoundingClientRect();

      if (!rect.width) {
        return;
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
      const inactiveRadius = 0.5 * Math.min(rect.width, rect.height) * INACTIVE_ZONE_RATIO;

      if (distance < inactiveRadius) {
        element.style.setProperty('--active', '0');
        return;
      }

      const isActive =
        event.clientX > rect.left - PROXIMITY_PX &&
        event.clientX < rect.right + PROXIMITY_PX &&
        event.clientY > rect.top - PROXIMITY_PX &&
        event.clientY < rect.bottom + PROXIMITY_PX;

      element.style.setProperty('--active', isActive ? '1' : '0');

      if (!isActive) {
        return;
      }

      const angle = (180 * Math.atan2(event.clientY - centerY, event.clientX - centerX)) / Math.PI + 90;
      element.style.setProperty('--start', String(angle));
    };

    this.ngZone.runOutsideAngular(() => {
      this.document.body.addEventListener('pointermove', handlePointerMove, { passive: true });
      this.unlisten = () => this.document.body.removeEventListener('pointermove', handlePointerMove);
    });
  }
}
