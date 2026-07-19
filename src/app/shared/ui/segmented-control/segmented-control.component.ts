import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { IconComponent } from '../icon/icon.component';
import { SegmentedOption } from './segmented-option.model';

/**
 * Pill-shaped segmented control — ported from the handoff's `seg(active)`
 * style factory. Drives the theme switcher (system/light/dark) and the
 * dashboard command-center/daily-focus toggle.
 */
@Component({
  selector: 'app-segmented-control',
  imports: [IconComponent],
  templateUrl: './segmented-control.component.html',
  styleUrl: './segmented-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentedControlComponent<T extends string = string> {
  readonly options = input.required<readonly SegmentedOption<T>[]>();
  readonly value = input.required<T>();
  readonly valueChange = output<T>();

  select(value: T): void {
    if (value !== this.value()) {
      this.valueChange.emit(value);
    }
  }
}
