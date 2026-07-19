import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { IconComponent } from '../icon/icon.component';

/** Square 38px icon-only button — sidebar reopen, theme toggle, notifications. */
@Component({
  selector: 'app-icon-button',
  imports: [IconComponent],
  template: `
    <button type="button" class="icon-btn" [attr.aria-label]="ariaLabel()" [attr.title]="ariaLabel()" (click)="pressed.emit()">
      <app-icon [name]="icon()" size="18" />
      @if (badge()) {
        <span class="icon-btn__badge"></span>
      }
    </button>
  `,
  styleUrl: './icon-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconButtonComponent {
  readonly icon = input.required<string>();
  readonly ariaLabel = input.required<string>();
  readonly badge = input(false);
  readonly pressed = output<void>();
}
