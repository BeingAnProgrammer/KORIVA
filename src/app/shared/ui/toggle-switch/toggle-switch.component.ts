import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/** Pill toggle switch — matches the reference's `.sw` control (Settings toggle rows). */
@Component({
  selector: 'app-toggle-switch',
  template: `
    <button
      type="button"
      class="toggle"
      [class.toggle--on]="on()"
      [attr.aria-pressed]="on()"
      [attr.aria-label]="ariaLabel()"
      (click)="toggled.emit(!on())"
    >
      <span class="toggle__thumb"></span>
    </button>
  `,
  styleUrl: './toggle-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleSwitchComponent {
  readonly on = input(false);
  readonly ariaLabel = input('');
  readonly toggled = output<boolean>();
}
