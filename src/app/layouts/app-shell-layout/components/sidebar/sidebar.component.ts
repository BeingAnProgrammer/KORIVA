import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SidebarService } from '../../../../core/services/sidebar.service';
import { APP_NAV_ITEMS } from '../../../../data/mock/navigation.mock-data';
import { AvatarComponent } from '../../../../shared/ui/avatar/avatar.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { LogoMarkComponent } from '../../../../shared/ui/logo-mark/logo-mark.component';

/** App-shell sidebar — logo, workspace nav, collapse toggle, user chip. */
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, LogoMarkComponent, IconComponent, AvatarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  protected readonly sidebar = inject(SidebarService);
  protected readonly navItems = APP_NAV_ITEMS;
}
