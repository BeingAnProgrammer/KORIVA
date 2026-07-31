import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ThemeMode } from '../../../core/models/theme.model';
import { SeoService } from '../../../core/services/seo.service';
import { ThemeService } from '../../../core/services/theme.service';
import { AutomationsDataService } from '../../../data/services/automations-data.service';
import { SettingsDataService } from '../../../data/services/settings-data.service';
import { TeamsDataService } from '../../../data/services/teams-data.service';
import { TemplatesDataService } from '../../../data/services/templates-data.service';
import { AvatarComponent } from '../../../shared/ui/avatar/avatar.component';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { SegmentedControlComponent } from '../../../shared/ui/segmented-control/segmented-control.component';
import { SegmentedOption } from '../../../shared/ui/segmented-control/segmented-option.model';
import { StatusPillComponent } from '../../../shared/ui/status-pill/status-pill.component';
import { AutomationCardComponent } from '../components/automation-card/automation-card.component';
import { TeamCardComponent } from '../components/team-card/team-card.component';
import { TemplateCardComponent } from '../components/template-card/template-card.component';

const THEME_OPTIONS: readonly SegmentedOption<ThemeMode>[] = [
  { value: 'system', label: 'System', icon: 'monitor' },
  { value: 'light', label: 'Light', icon: 'sun' },
  { value: 'dark', label: 'Dark', icon: 'moon' }
];

@Component({
  selector: 'app-settings-page',
  imports: [IconComponent, AvatarComponent, SegmentedControlComponent, StatusPillComponent, TeamCardComponent, AutomationCardComponent, TemplateCardComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPageComponent {
  private readonly seo = inject(SeoService);
  private readonly data = inject(SettingsDataService);
  private readonly teamsData = inject(TeamsDataService);
  private readonly automationsData = inject(AutomationsDataService);
  private readonly templatesData = inject(TemplatesDataService);
  protected readonly themeService = inject(ThemeService);

  protected readonly navItems = toSignal(this.data.getNavItems(), { initialValue: [] });
  protected readonly themeOptions = THEME_OPTIONS;
  protected readonly activeSection = signal('profile');

  protected readonly teams = toSignal(this.teamsData.getTeams(), { initialValue: [] });
  protected readonly automations = toSignal(this.automationsData.getAutomations(), { initialValue: [] });
  protected readonly templates = toSignal(this.templatesData.getTemplates(), { initialValue: [] });

  constructor() {
    this.seo.setPage({
      title: 'Settings',
      description: 'Profile, workspace, teams, automations, and integrations.',
      path: '/app/settings'
    });
  }
}
