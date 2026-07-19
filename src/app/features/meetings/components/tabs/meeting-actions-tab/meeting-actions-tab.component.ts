import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ActionItemsDataService } from '../../../../../data/services/action-items-data.service';
import { ActionItemsTableComponent } from '../../../../../shared/ui/action-items-table/action-items-table.component';

/** Meeting detail "Action items" tab — ported verbatim. */
@Component({
  selector: 'app-meeting-actions-tab',
  imports: [ActionItemsTableComponent],
  template: `<div class="meeting-actions-tab"><app-action-items-table [items]="actionItems()" /></div>`,
  styles: `
    .meeting-actions-tab {
      max-width: 1000px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingActionsTabComponent {
  private readonly data = inject(ActionItemsDataService);

  protected readonly actionItems = toSignal(this.data.getActionItems(), { initialValue: [] });
}
