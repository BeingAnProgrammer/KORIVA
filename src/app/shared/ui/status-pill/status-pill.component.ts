import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { PillVariant } from '../../../data/models/pill-variant.model';

@Component({
  selector: 'app-status-pill',
  template: `<span class="status-pill {{ variantClass() }}"><ng-content /></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusPillComponent {
  readonly variant = input.required<PillVariant>();

  protected readonly variantClass = computed(() => `status-pill--${this.variant()}`);
}
