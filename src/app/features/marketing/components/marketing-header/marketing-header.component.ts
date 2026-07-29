import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { AuthService } from '../../../../core/services/auth.service';
import { MarketingContentService } from '../../../../data/services/marketing-content.service';
import { LogoMarkComponent } from '../../../../shared/ui/logo-mark/logo-mark.component';

/** Sticky marketing nav — logo, flat link row, sign-in action, mobile drawer. */
@Component({
  selector: 'app-marketing-header',
  imports: [RouterLink, LogoMarkComponent],
  templateUrl: './marketing-header.component.html',
  styleUrl: './marketing-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketingHeaderComponent {
  private readonly content = inject(MarketingContentService);
  private readonly auth = inject(AuthService);

  protected readonly navPills = toSignal(this.content.getNavPills(), { initialValue: [] });
  protected readonly activeNav = signal('Features');
  protected readonly mobileOpen = signal(false);

  protected readonly accountLink = computed(() => (this.auth.isAuthenticated() ? '/app/dashboard' : '/login'));
  protected readonly accountLabel = computed(() => (this.auth.isAuthenticated() ? 'Dashboard' : 'Sign in'));

  protected setActive(name: string): void {
    this.activeNav.set(name);
  }

  protected toggleMobile(): void {
    this.mobileOpen.update((open) => !open);
  }

  protected closeMobile(): void {
    this.mobileOpen.set(false);
  }

  protected onMobileLinkClick(name: string): void {
    this.setActive(name);
    this.closeMobile();
  }
}
