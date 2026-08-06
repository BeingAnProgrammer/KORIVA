import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { CommandPaletteService } from '../../../../core/services/command-palette.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { ToastService } from '../../../../core/services/toast.service';
import { APP_NAV_ITEMS } from '../../../../data/mock/navigation.mock-data';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { AvatarComponent } from '../../../../shared/ui/avatar/avatar.component';
import { IconButtonComponent } from '../../../../shared/ui/icon-button/icon-button.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { LogoMarkComponent } from '../../../../shared/ui/logo-mark/logo-mark.component';

/**
 * App-wide top-nav bar — replaces the old left sidebar entirely, matching
 * the reference's single horizontal header: logo, inline page links, and a
 * right-hand cluster (live-meeting status, theme, search, user).
 */
@Component({
  selector: 'app-top-nav',
  imports: [RouterLink, RouterLinkActive, LogoMarkComponent, IconComponent, IconButtonComponent, AvatarComponent, ButtonDirective],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavComponent {
  protected readonly auth = inject(AuthService);
  protected readonly theme = inject(ThemeService);
  protected readonly palette = inject(CommandPaletteService);
  private readonly toast = inject(ToastService);

  protected readonly navItems = APP_NAV_ITEMS;

  protected readonly mobileNavOpen = signal(false);
  protected readonly userMenuOpen = signal(false);

  protected readonly userInitials = computed(() => {
    const user = this.auth.currentUser();
    const source = user?.fullName || user?.email || '';
    const parts = source.trim().split(/\s+/).filter(Boolean);
    const initials = parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : source.slice(0, 2);
    return initials.toUpperCase() || 'YOU';
  });

  protected readonly userName = computed(() => this.auth.currentUser()?.fullName || 'Your account');
  protected readonly userEmail = computed(() => this.auth.currentUser()?.email ?? '');

  protected toggleMobileNav(): void {
    this.mobileNavOpen.update((v) => !v);
  }

  protected closeMobileNav(): void {
    this.mobileNavOpen.set(false);
  }

  protected toggleUserMenu(): void {
    this.userMenuOpen.update((v) => !v);
  }

  protected closeUserMenu(): void {
    this.userMenuOpen.set(false);
  }

  protected signOut(): void {
    this.closeUserMenu();
    void this.auth.signOut();
  }

  protected inviteKoriva(): void {
    this.toast.show('Koriva will join your next scheduled meeting');
  }
}
