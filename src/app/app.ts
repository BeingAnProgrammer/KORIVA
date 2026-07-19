import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Injected (not just imported) so its theme-applying effect runs from the
  // very first render, in SSR output as well as after hydration — it would
  // otherwise stay dormant until something else first injects the service.
  private readonly themeService = inject(ThemeService);
}
