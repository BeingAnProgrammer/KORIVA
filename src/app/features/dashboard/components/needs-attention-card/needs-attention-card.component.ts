import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NeedsAttentionItem } from '../../../../data/models/needs-attention-item.model';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/** Dashboard "Needs attention" card — the concrete Action pole: gaps and failures, not decoration. */
@Component({
  selector: 'app-needs-attention-card',
  imports: [RouterLink, IconComponent],
  templateUrl: './needs-attention-card.component.html',
  styleUrl: './needs-attention-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeedsAttentionCardComponent {
  readonly items = input.required<readonly NeedsAttentionItem[]>();
}
