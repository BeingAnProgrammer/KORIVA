import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { LogoMarkComponent } from '../../../../shared/ui/logo-mark/logo-mark.component';

/** Landing page footer — brand blurb and link columns. */
@Component({
  selector: 'app-marketing-footer',
  imports: [RouterLink, IconComponent, LogoMarkComponent],
  templateUrl: './marketing-footer.component.html',
  styleUrl: './marketing-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketingFooterComponent {}
