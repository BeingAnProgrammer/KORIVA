import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, afterNextRender, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { JourneyStageDirective } from '../../../../shared/directives/journey-stage.directive';
import { MagneticHoverDirective } from '../../../../shared/directives/magnetic-hover.directive';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { MarqueeComponent } from '../../../../shared/ui/marquee/marquee.component';

const MARQUEE_ITEMS: readonly string[] = [
  'Meeting Intelligence',
  'AI-Generated Minutes',
  'Action Item Tracking',
  'Organizational Memory',
  'Ask Anything'
];

const AURORA_PARALLAX_STRENGTH = 0.06;

/**
 * Cinematic closing CTA — a full-bleed, scroll-pinned section (native CSS
 * `position: sticky`, no scroll-jacking library) with a giant background
 * wordmark, aurora glow, dot-grid, and a looping marquee. The final journey
 * stage ("Action") — the rail's thread resolves here, the same brand
 * indigo the hero opened on. The aurora drifts subtly toward the cursor
 * (desktop only) for a last touch of "alive" before the page ends.
 */
@Component({
  selector: 'app-cta-band',
  imports: [RouterLink, MagneticHoverDirective, ScrollRevealDirective, JourneyStageDirective, IconComponent, MarqueeComponent],
  templateUrl: './cta-band.component.html',
  styleUrl: './cta-band.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CtaBandComponent implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly ngZone = inject(NgZone);

  private readonly pinAreaRef = viewChild<ElementRef<HTMLElement>>('pinArea');
  private readonly auroraRef = viewChild<ElementRef<HTMLElement>>('aurora');

  protected readonly marqueeItems = MARQUEE_ITEMS;

  private unlisten?: () => void;

  constructor() {
    afterNextRender(() => this.bindAuroraParallax());
  }

  ngOnDestroy(): void {
    this.unlisten?.();
  }

  protected scrollToTop(): void {
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private bindAuroraParallax(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || prefersCoarsePointer) {
      return;
    }

    // Reads the viewChild signals fresh on every event rather than closing
    // over a single captured node — this section sits at the very bottom of
    // a long SSR-hydrated page, and a captured reference occasionally ends
    // up pointing at a DOM node Angular has since replaced. The signals
    // themselves always resolve to whatever is currently in the view.
    // Listening on `window` rather than the pin element for the same
    // reason: it's never itself a target of replacement.
    const handlePointerMove = (event: PointerEvent) => {
      const pinArea = this.pinAreaRef()?.nativeElement;
      const aurora = this.auroraRef()?.nativeElement;

      if (!pinArea || !aurora) {
        return;
      }

      const rect = pinArea.getBoundingClientRect();

      if (event.clientY < rect.top || event.clientY > rect.bottom) {
        return;
      }

      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      // The aurora's base CSS already centers it via `translate(-50%, -50%)`
      // (see .cta-cinematic__aurora) — combine with `calc()` rather than
      // overwriting, or the parallax offset would replace that centering.
      aurora.style.transform = `translate(calc(-50% + ${x * AURORA_PARALLAX_STRENGTH}px), calc(-50% + ${y * AURORA_PARALLAX_STRENGTH}px))`;
    };

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('pointermove', handlePointerMove);
      this.unlisten = () => window.removeEventListener('pointermove', handlePointerMove);
    });
  }
}
