import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { ActionItem } from '../../../data/models/action-item.model';
import { AvatarComponent } from '../avatar/avatar.component';
import { StatusPillComponent } from '../status-pill/status-pill.component';

/**
 * Action-item table — reused (with columns toggled per context) by the
 * standalone Action Items page (checkbox + due + meeting), the
 * meeting-detail Actions tab (due, no meeting), and the AI Assistant page's
 * citation preview (owner + status only).
 */
@Component({
  selector: 'app-action-items-table',
  imports: [AvatarComponent, StatusPillComponent],
  templateUrl: './action-items-table.component.html',
  styleUrl: './action-items-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionItemsTableComponent {
  readonly items = input.required<readonly ActionItem[]>();
  readonly showCheckbox = input(false);
  readonly showDue = input(true);
  readonly showMeeting = input(false);

  protected readonly gridTemplateColumns = computed(() => {
    if (this.showMeeting()) {
      return '2.4fr 1.2fr 1fr 1.2fr 1fr';
    }
    return this.showDue() ? '2.4fr 1.2fr 1fr 1fr' : '2.2fr 1.1fr 1fr';
  });
}
