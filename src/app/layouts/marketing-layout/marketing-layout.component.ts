import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Shell for public marketing routes. Currently a single landing page owns
 * its own header/footer; this shell exists as the extension point for
 * future marketing routes (pricing, security, about) without touching the
 * app-shell layout.
 */
@Component({
  selector: 'app-marketing-layout',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketingLayoutComponent {}
