import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/** Daily-focus "Next up" hero card — ported verbatim (static demo content, as in the design). */
@Component({
  selector: 'app-next-up-card',
  imports: [RouterLink, IconComponent],
  templateUrl: './next-up-card.component.html',
  styleUrl: './next-up-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextUpCardComponent {}
