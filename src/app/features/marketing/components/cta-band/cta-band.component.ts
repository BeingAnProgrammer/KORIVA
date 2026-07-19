import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MagneticHoverDirective } from '../../../../shared/directives/magnetic-hover.directive';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

const MARQUEE_ITEMS: readonly string[] = [
  'Meeting Intelligence',
  'AI-Generated Minutes',
  'Action Item Tracking',
  'Organizational Memory',
  'Ask Anything'
];

/**
 * Cinematic closing CTA — a full-bleed, scroll-pinned section (native CSS
 * `position: sticky`, no scroll-jacking library) with a giant background
 * wordmark, aurora glow, dot-grid, and a looping marquee. Replaces the
 * plain gradient CTA card at the user's request.
 */
@Component({
  selector: 'app-cta-band',
  imports: [RouterLink, MagneticHoverDirective, ScrollRevealDirective, IconComponent],
  templateUrl: './cta-band.component.html',
  styleUrl: './cta-band.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CtaBandComponent {
  private readonly document = inject(DOCUMENT);

  protected readonly marqueeItems = MARQUEE_ITEMS;
  protected readonly marqueeRows = [0, 1];

  protected scrollToTop(): void {
    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
