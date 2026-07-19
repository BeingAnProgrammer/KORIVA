import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Team } from '../../../../data/models/team.model';
import { ChipComponent } from '../../../../shared/ui/chip/chip.component';

/**
 * Team roster card — ported verbatim. The stacked-avatar row uses the same
 * three static initials as the source design (a fixed illustrative roster,
 * not derived per-team data).
 */
@Component({
  selector: 'app-team-card',
  imports: [ChipComponent],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamCardComponent {
  readonly team = input.required<Team>();
}
