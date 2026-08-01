import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommandPaletteComponent } from '../../shared/ui/command-palette/command-palette.component';
import { ToastComponent } from '../../shared/ui/toast/toast.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';

/** Shell for authenticated `/app/**` routes — top nav + routed page content. */
@Component({
  selector: 'app-shell-layout',
  imports: [RouterOutlet, TopNavComponent, CommandPaletteComponent, ToastComponent],
  templateUrl: './app-shell-layout.component.html',
  styleUrl: './app-shell-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellLayoutComponent {}
