import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconComponent } from '../../../../../shared/ui/icon/icon.component';

interface MomActionItem {
  task: string;
  owner: string;
  deadline: string;
}

const MOM_ACTION_ITEMS: readonly MomActionItem[] = [
  { task: 'Scope SSO with Northwind', owner: 'Priya Nair', deadline: 'Oct 18' },
  { task: 'Revisit mid-market pricing', owner: 'Ava Reyes', deadline: 'Oct 21' },
  { task: 'Pull Azure OpenAI usage report', owner: 'Priya Nair', deadline: 'Oct 16' }
];

/** Meeting detail "MOM" tab — ported verbatim (static demo document). */
@Component({
  selector: 'app-mom-tab',
  imports: [IconComponent],
  templateUrl: './mom-tab.component.html',
  styleUrl: './mom-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MomTabComponent {
  protected readonly actionItems = MOM_ACTION_ITEMS;
}
