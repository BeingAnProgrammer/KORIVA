import { Directive, computed, input } from '@angular/core';

export type ButtonVariant =
  | 'primary'
  | 'primary-lg'
  | 'secondary'
  | 'secondary-lg'
  | 'ghost'
  // Reference design's button system (Home/Commitments/Patterns/…) —
  // distinct from the legacy pill-shaped marketing variants above.
  | 'accent'
  | 'accent-sm'
  | 'soft'
  | 'soft-sm'
  | 'ref-ghost'
  | 'ref-ghost-sm';

/**
 * Applies the design's button visual language to any native `<button>` or
 * `<a>` — `<button appButton variant="primary">…</button>` — so the same
 * interactive element can be a real link (routerLink) or a real button
 * without wrapping it in a component.
 */
@Directive({
  selector: '[appButton]',
  host: {
    '[class]': 'hostClasses()'
  }
})
export class ButtonDirective {
  readonly variant = input<ButtonVariant>('primary');

  protected readonly hostClasses = computed(() => `btn btn--${this.variant()}`);
}
