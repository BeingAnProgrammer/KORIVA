import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * The KORIVA mark — a rounded-square badge with a geometric "K" monogram.
 * The upper stroke terminates in a dot: the brand's "signal" accent,
 * standing in for the voice/insight pillar of the product. `showDot` lets
 * the footer render the monogram without it, as the previous mark did.
 */
@Component({
  selector: 'app-logo-mark',
  template: `
    <svg viewBox="0 0 64 64" fill="none" [style.width.px]="size()" [style.height.px]="size()">
      <rect x="3" y="3" width="58" height="58" rx="16" fill="var(--accent)" />
      <path
        d="M23 18L23 46M23 32L45 18M23 32L45 46"
        stroke="var(--accent-fg)"
        stroke-width="7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      @if (showDot()) {
        <circle cx="45" cy="18" r="5" fill="var(--accent-fg)" />
      }
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoMarkComponent {
  readonly size = input<number>(28);
  readonly showDot = input<boolean>(true);
}
