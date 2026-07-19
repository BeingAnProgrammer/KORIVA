import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ChipVariant = 'default' | 'pill' | 'lead' | 'recording' | 'action-count';

/** Generic small tag/badge chip — feature tags, template meta, etc. */
@Component({
  selector: 'app-chip',
  template: `<span class="{{ classes() }}"><ng-content /></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent {
  readonly variant = input<ChipVariant>('default');

  protected readonly classes = computed(() => {
    const variant = this.variant();
    return variant === 'default' ? 'chip' : `chip chip--${variant}`;
  });
}
