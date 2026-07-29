import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { SidebarService } from '../../../../core/services/sidebar.service';
import { APP_NAV_ITEMS } from '../../../../data/mock/navigation.mock-data';
import { AvatarComponent } from '../../../../shared/ui/avatar/avatar.component';
import { IconButtonComponent } from '../../../../shared/ui/icon-button/icon-button.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { LogoMarkComponent } from '../../../../shared/ui/logo-mark/logo-mark.component';

/** App-shell sidebar — logo, workspace nav, collapse toggle, user chip. */
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, LogoMarkComponent, IconComponent, AvatarComponent, IconButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  protected readonly sidebar = inject(SidebarService);
  protected readonly auth = inject(AuthService);
  protected readonly navItems = APP_NAV_ITEMS;

  protected readonly userInitials = computed(() => {
    const user = this.auth.currentUser();
    const source = user?.fullName || user?.email || '';
    const parts = source.trim().split(/\s+/).filter(Boolean);
    const initials = parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : source.slice(0, 2);
    return initials.toUpperCase() || '?';
  });

  protected readonly userName = computed(() => this.auth.currentUser()?.fullName || 'Your account');
  protected readonly userSubtitle = computed(() => this.auth.currentUser()?.email ?? '');

  protected signOut(): void {
    void this.auth.signOut();
  }
}
