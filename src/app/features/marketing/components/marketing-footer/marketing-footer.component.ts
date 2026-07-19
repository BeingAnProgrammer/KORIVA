import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ThemeMode } from '../../../../core/models/theme.model';
import { ThemeService } from '../../../../core/services/theme.service';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { LogoMarkComponent } from '../../../../shared/ui/logo-mark/logo-mark.component';
import { SegmentedControlComponent } from '../../../../shared/ui/segmented-control/segmented-control.component';
import { SegmentedOption } from '../../../../shared/ui/segmented-control/segmented-option.model';

const THEME_OPTIONS: readonly SegmentedOption<ThemeMode>[] = [
  { value: 'system', label: 'System', icon: 'monitor' },
  { value: 'light', label: 'Light', icon: 'sun' },
  { value: 'dark', label: 'Dark', icon: 'moon' }
];

/** Landing page footer — brand blurb, link columns, theme switcher. */
@Component({
  selector: 'app-marketing-footer',
  imports: [IconComponent, LogoMarkComponent, SegmentedControlComponent],
  templateUrl: './marketing-footer.component.html',
  styleUrl: './marketing-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketingFooterComponent {
  protected readonly themeService = inject(ThemeService);
  protected readonly themeOptions = THEME_OPTIONS;
}
