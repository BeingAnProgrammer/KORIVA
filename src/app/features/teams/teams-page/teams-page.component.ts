import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SeoService } from '../../../core/services/seo.service';
import { TeamsDataService } from '../../../data/services/teams-data.service';
import { TeamCardComponent } from '../components/team-card/team-card.component';

@Component({
  selector: 'app-teams-page',
  imports: [TeamCardComponent],
  templateUrl: './teams-page.component.html',
  styleUrl: './teams-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsPageComponent {
  private readonly seo = inject(SeoService);
  private readonly data = inject(TeamsDataService);

  protected readonly teams = toSignal(this.data.getTeams(), { initialValue: [] });

  constructor() {
    this.seo.setPage({
      title: 'Teams',
      description: 'Meeting activity and ownership across every team.',
      path: '/app/teams'
    });
  }
}
