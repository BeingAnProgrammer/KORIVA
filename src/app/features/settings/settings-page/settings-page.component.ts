import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ThemeMode } from '../../../core/models/theme.model';
import { SeoService } from '../../../core/services/seo.service';
import { ThemeService } from '../../../core/services/theme.service';
import { SettingsDataService } from '../../../data/services/settings-data.service';
import { AvatarComponent } from '../../../shared/ui/avatar/avatar.component';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { SegmentedControlComponent } from '../../../shared/ui/segmented-control/segmented-control.component';
import { SegmentedOption } from '../../../shared/ui/segmented-control/segmented-option.model';
import { StatusPillComponent } from '../../../shared/ui/status-pill/status-pill.component';

const THEME_OPTIONS: readonly SegmentedOption<ThemeMode>[] = [
  { value: 'system', label: 'System', icon: 'monitor' },
  { value: 'light', label: 'Light', icon: 'sun' },
  { value: 'dark', label: 'Dark', icon: 'moon' }
];

@Component({
  selector: 'app-settings-page',
  imports: [IconComponent, AvatarComponent, SegmentedControlComponent, StatusPillComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
  private readonly seo = inject(SeoService);
  private readonly data = inject(SettingsDataService);
  protected readonly themeService = inject(ThemeService);

  protected readonly navItems = toSignal(this.data.getNavItems(), { initialValue: [] });
  protected readonly themeOptions = THEME_OPTIONS;

  constructor() {
    this.seo.setPage({
      title: 'Settings',
      description: 'Profile, AI configuration, integrations, and workspace preferences.',
      path: '/app/settings'
    });
  }
}
