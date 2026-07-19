import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/** Landing page closing CTA band — ported verbatim. */
@Component({
  selector: 'app-cta-band',
  imports: [RouterLink, ButtonDirective, IconComponent],
  templateUrl: './cta-band.component.html',
  styleUrl: './cta-band.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CtaBandComponent {}
