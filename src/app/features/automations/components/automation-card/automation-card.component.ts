import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Automation } from '../../../../data/models/automation.model';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { ToggleSwitchComponent } from '../../../../shared/ui/toggle-switch/toggle-switch.component';

/** Automation rule card — ported verbatim. */
@Component({
  selector: 'app-automation-card',
  imports: [IconComponent, ToggleSwitchComponent],
  templateUrl: './automation-card.component.html',
  styleUrl: './automation-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutomationCardComponent {
  readonly automation = input.required<Automation>();
}
