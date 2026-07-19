import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/** The landing page's "lamp" hero — ported verbatim from the handoff markup. */
@Component({
  selector: 'app-hero-lamp',
  imports: [RouterLink, ButtonDirective, IconComponent],
  templateUrl: './hero-lamp.component.html',
  styleUrl: './hero-lamp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroLampComponent {}
