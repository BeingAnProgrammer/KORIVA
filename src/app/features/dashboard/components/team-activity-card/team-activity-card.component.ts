import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TeamActivity } from '../../../../data/models/team-activity.model';

/** Dashboard "Team activity" feed — ported verbatim. */
@Component({
  selector: 'app-team-activity-card',
  templateUrl: './team-activity-card.component.html',
  styleUrl: './team-activity-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamActivityCardComponent {
  readonly activity = input.required<readonly TeamActivity[]>();
}
