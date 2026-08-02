import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject, signal } from '@angular/core';
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

const TOGGLES_STORAGE_KEY = 'koriva-toggles';

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
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
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
      .subscribe((items) => this.toggles.set(this.applyStoredToggles(items)));
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
      this.persistToggles();
    }
  }

  private applyStoredToggles(items: readonly ToggleItem[]): readonly ToggleItem[] {
    if (!this.isBrowser) {
      return items;
    }

    const stored = localStorage.getItem(TOGGLES_STORAGE_KEY);
    if (!stored) {
      return items;
    }

    const overrides: Record<string, boolean> = JSON.parse(stored);
    return items.map((item) => (item.id in overrides ? { ...item, on: overrides[item.id] } : item));
  }

  private persistToggles(): void {
    if (!this.isBrowser) {
      return;
    }

    const overrides: Record<string, boolean> = {};
    for (const item of this.toggles()) {
      overrides[item.id] = item.on;
    }
    localStorage.setItem(TOGGLES_STORAGE_KEY, JSON.stringify(overrides));
  }

  connectionAction(connection: ConnectionItem): void {
    this.toast.show(connection.connected ? `Manage ${connection.name}` : `Connecting ${connection.name}…`);
  }
}
