import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';

/** Shell for authenticated `/app/**` routes — sidebar + top header + routed page content. */
@Component({
  selector: 'app-shell-layout',
  imports: [RouterOutlet, SidebarComponent, TopHeaderComponent],
  templateUrl: './app-shell-layout.component.html',
  styleUrl: './app-shell-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellLayoutComponent {}
