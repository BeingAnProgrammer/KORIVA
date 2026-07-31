import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';
import { ButtonDirective } from '../../../shared/directives/button.directive';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { CommandCenterComponent } from '../components/command-center/command-center.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink, ButtonDirective, IconComponent, CommandCenterComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setPage({
      title: 'Dashboard',
      description: 'Your meetings, action items, and AI insights at a glance.',
      path: '/app/dashboard'
    });
  }
}
