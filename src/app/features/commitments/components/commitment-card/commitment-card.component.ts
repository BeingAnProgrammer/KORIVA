import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { ActionItem } from '../../../../data/models/action-item.model';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { StatusPillComponent } from '../../../../shared/ui/status-pill/status-pill.component';

/**
 * A single commitment row — the sentence someone said, who owes it, and a
 * staleness badge. New component (per the redesign brief); nothing like it
 * existed on the old Action items table.
 */
@Component({
  selector: 'app-commitment-card',
  imports: [StatusPillComponent, ButtonDirective, IconComponent],
  templateUrl: './commitment-card.component.html',
  styleUrl: './commitment-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitmentCardComponent {
  readonly commitment = input.required<ActionItem>();
  readonly toggled = output<void>();
  readonly nudged = output<void>();
  readonly meetingClicked = output<void>();
}
