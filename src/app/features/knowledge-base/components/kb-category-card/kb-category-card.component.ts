import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { KbCategory } from '../../../../data/models/kb-category.model';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/** Knowledge base category tile — ported verbatim. */
@Component({
  selector: 'app-kb-category-card',
  imports: [IconComponent],
  templateUrl: './kb-category-card.component.html',
  styleUrl: './kb-category-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KbCategoryCardComponent {
  readonly category = input.required<KbCategory>();
}
