import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { MarketingContentService } from '../../../../data/services/marketing-content.service';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { LogoMarkComponent } from '../../../../shared/ui/logo-mark/logo-mark.component';

/** Sticky marketing nav — logo, pill nav, sign-in/get-started actions. */
@Component({
  selector: 'app-marketing-header',
  imports: [RouterLink, ButtonDirective, IconComponent, LogoMarkComponent],
  templateUrl: './marketing-header.component.html',
  styleUrl: './marketing-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketingHeaderComponent {
  private readonly content = inject(MarketingContentService);

  protected readonly navPills = toSignal(this.content.getNavPills(), { initialValue: [] });
  protected readonly activeNav = signal('Features');

  protected setActive(name: string): void {
    this.activeNav.set(name);
  }
}
