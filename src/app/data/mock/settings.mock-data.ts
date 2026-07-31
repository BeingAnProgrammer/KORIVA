import { SettingsNavItem } from '../models/settings-nav-item.model';

export const SETTINGS_NAV_ITEMS: readonly SettingsNavItem[] = [
  { key: 'profile', icon: 'user', label: 'User profile' },
  { key: 'theme', icon: 'palette', label: 'Theme' },
  { key: 'integrations', icon: 'plug', label: 'Meeting integrations' },
  { key: 'teams', icon: 'users', label: 'Teams' },
  { key: 'automations', icon: 'workflow', label: 'Automations' },
  { key: 'templates', icon: 'layout-template', label: 'Templates' }
];
