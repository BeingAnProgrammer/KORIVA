import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SeoService } from '../../../core/services/seo.service';
import { AutomationsDataService } from '../../../data/services/automations-data.service';
import { AutomationCardComponent } from '../components/automation-card/automation-card.component';

@Component({
  selector: 'app-automations-page',
  imports: [AutomationCardComponent],
  templateUrl: './automations-page.component.html',
  styleUrl: './automations-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutomationsPageComponent {
  private readonly seo = inject(SeoService);
  private readonly data = inject(AutomationsDataService);

  protected readonly automations = toSignal(this.data.getAutomations(), { initialValue: [] });

  constructor() {
    this.seo.setPage({
      title: 'Automations',
      description: 'Configure how KORIVA joins, records, and follows up automatically.',
      path: '/app/automations'
    });
  }
}
