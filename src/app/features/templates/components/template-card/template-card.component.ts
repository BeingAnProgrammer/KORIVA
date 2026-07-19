import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TemplateCard } from '../../../../data/models/template-card.model';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/** Meeting template card — ported verbatim. */
@Component({
  selector: 'app-template-card',
  imports: [IconComponent],
  templateUrl: './template-card.component.html',
  styleUrl: './template-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateCardComponent {
  readonly template = input.required<TemplateCard>();
}
