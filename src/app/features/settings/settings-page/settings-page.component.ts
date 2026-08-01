import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { ACCENT_OPTIONS, ThemeMode } from '../../../core/models/theme.model';
import { SeoService } from '../../../core/services/seo.service';
import { ThemeService } from '../../../core/services/theme.service';
import { ToastService } from '../../../core/services/toast.service';
import { ConnectionItem } from '../../../data/models/connection-item.model';
import { ToggleItem } from '../../../data/models/toggle-item.model';
import { SettingsDataService } from '../../../data/services/settings-data.service';
import { SegmentedControlComponent } from '../../../shared/ui/segmented-control/segmented-control.component';
import { SegmentedOption } from '../../../shared/ui/segmented-control/segmented-option.model';
import { ToggleSwitchComponent } from '../../../shared/ui/toggle-switch/toggle-switch.component';

const THEME_OPTIONS: readonly SegmentedOption<ThemeMode>[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' }
];

@Component({
  selector: 'app-settings-page',
  imports: [SegmentedControlComponent, ToggleSwitchComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
  private readonly seo = inject(SeoService);
  private readonly data = inject(SettingsDataService);
  private readonly toast = inject(ToastService);
  protected readonly themeService = inject(ThemeService);

  protected readonly themeOptions = THEME_OPTIONS;
  protected readonly accentOptions = ACCENT_OPTIONS;

  protected readonly toggles = signal<readonly ToggleItem[]>([]);
  protected readonly connections = toSignal(this.data.getConnections(), { initialValue: [] });

  constructor() {
    this.seo.setPage({
      title: 'Settings',
      description: 'Theme, accent colour, meeting automations, and connected apps.',
      path: '/app/settings'
    });

    this.data
      .getToggles()
      .pipe(takeUntilDestroyed())
      .subscribe((items) => this.toggles.set(items));
  }

  flipToggle(id: string): void {
    let toggled: ToggleItem | undefined;
    this.toggles.update((items) =>
      items.map((item) => {
        if (item.id !== id) {
          return item;
        }
        toggled = { ...item, on: !item.on };
        return toggled;
      })
    );
    if (toggled) {
      this.toast.show(`${toggled.label} — ${toggled.on ? 'on' : 'off'}`);
    }
  }

  connectionAction(connection: ConnectionItem): void {
    this.toast.show(connection.connected ? `Manage ${connection.name}` : `Connecting ${connection.name}…`);
  }
}
