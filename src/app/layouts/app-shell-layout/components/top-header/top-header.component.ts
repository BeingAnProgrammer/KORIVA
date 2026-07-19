import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RouteTitleData } from '../../../../core/models/route-title-data.model';
import { RouteDataService } from '../../../../core/services/route-data.service';
import { SidebarService } from '../../../../core/services/sidebar.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { IconButtonComponent } from '../../../../shared/ui/icon-button/icon-button.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/** App-shell top header — back nav, page title, search, theme toggle, notifications, new meeting. */
@Component({
  selector: 'app-top-header',
  imports: [RouterLink, IconComponent, IconButtonComponent],
  templateUrl: './top-header.component.html',
  styleUrl: './top-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopHeaderComponent {
  protected readonly sidebar = inject(SidebarService);
  protected readonly theme = inject(ThemeService);
  private readonly routeData = inject(RouteDataService);

  protected readonly title = computed(() => (this.routeData.data() as RouteTitleData).title ?? '');
  protected readonly backLink = computed(() => (this.routeData.data() as RouteTitleData).backLink);
}
