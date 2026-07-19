import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Visual-only toggle switch (matches the design — Automations page has no live wiring). */
@Component({
  selector: 'app-toggle-switch',
  template: `
    <span class="toggle" [class.toggle--on]="on()">
      <span class="toggle__thumb"></span>
    </span>
  `,
  styleUrl: './toggle-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleSwitchComponent {
  readonly on = input(false);
}
