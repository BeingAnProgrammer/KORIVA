import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * The KORIVA mark — ported verbatim from the design's inline SVG (header,
 * sidebar, and footer usages). The footer usage omits the centre dot in
 * the source design; `showDot` preserves that exact discrepancy rather
 * than "fixing" it.
 */
@Component({
  selector: 'app-logo-mark',
  template: `
    <svg viewBox="0 0 64 64" fill="none" [style.width.px]="size()" [style.height.px]="size()">
      <path
        d="M32 4a28 28 0 1 1 0 56 28 28 0 0 1-22.4-44.8L4 56l10.2-3.6A28 28 0 0 1 32 4z"
        fill="var(--accent)"
      />
      <path d="M42 22.5a12.5 12.5 0 1 0 0 19" stroke="var(--accent-fg)" stroke-width="4.5" stroke-linecap="round" fill="none" />
      @if (showDot()) {
        <circle cx="43.5" cy="32" r="2.4" fill="var(--accent-fg)" />
      }
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoMarkComponent {
  readonly size = input<number>(28);
  readonly showDot = input<boolean>(true);
}
