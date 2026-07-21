import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * The KORIVA mark — five irregular facets of clearly unequal weight, fused
 * around a shared off-centre point into one solid form. Not every voice in
 * a meeting carries the same weight, but every one of them shapes the final
 * outcome; the facets are flat-shaded via opacity steps (not a gradient) so
 * the mark stays a single monochrome `--ink` glyph and flips with the
 * site's theme, no accent colour or container needed.
 */
@Component({
  selector: 'app-logo-mark',
  template: `
    <svg viewBox="0 0 100 100" fill="none" [style.width.px]="size()" [style.height.px]="size()">
      <path d="M61 55L71 13L89 41Z" fill="var(--ink)" opacity="0.5" />
      <path d="M61 55L89 41L81 75Z" fill="var(--ink)" opacity="0.68" />
      <path d="M61 55L81 75L35 87Z" fill="var(--ink)" opacity="1" />
      <path d="M61 55L35 87L11 51Z" fill="var(--ink)" opacity="0.82" />
      <path d="M61 55L11 51L71 13Z" fill="var(--ink)" opacity="0.6" />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoMarkComponent {
  readonly size = input<number>(28);
}
