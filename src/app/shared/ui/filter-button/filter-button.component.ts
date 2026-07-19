import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconComponent } from '../icon/icon.component';

/** Small bordered filter/toolbar pill button (e.g. "All types", "Sort"). */
@Component({
  selector: 'app-filter-button',
  imports: [IconComponent],
  template: `
    <button type="button" class="filter-btn">
      <app-icon [name]="icon()" size="16" />
      {{ label() }}
    </button>
  `,
  styleUrl: './filter-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterButtonComponent {
  readonly icon = input.required<string>();
  readonly label = input.required<string>();
}
