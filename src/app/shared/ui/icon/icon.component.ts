import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';

/**
 * Thin wrapper over the icon set so templates can bind an icon by name —
 * `<app-icon name="arrow-right" />` — mirroring the design's
 * `<i data-lucide="arrow-right">` usage. Register new names in
 * `core/icons/icon-registry.ts`.
 */
@Component({
  selector: 'app-icon',
  imports: [LucideDynamicIcon],
  template: `
    <svg
      [lucideIcon]="name()"
      [size]="size()"
      [strokeWidth]="strokeWidth()"
      [color]="color()"
      aria-hidden="true"
    ></svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      line-height: 0;
    }

    svg {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  readonly name = input.required<string>();
  readonly size = input<string | number>('1em');
  readonly strokeWidth = input<string | number>(1.75);
  readonly color = input<string>('currentColor');
}
