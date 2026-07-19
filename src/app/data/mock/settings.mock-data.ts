import { SettingsNavItem } from '../models/settings-nav-item.model';

export const SETTINGS_NAV_ITEMS: readonly SettingsNavItem[] = [
  { icon: 'user', label: 'User profile', active: true },
  { icon: 'sparkles', label: 'AI configuration', active: false },
  { icon: 'plug', label: 'Meeting integrations', active: false },
  { icon: 'users', label: 'Teams', active: false },
  { icon: 'hard-drive', label: 'Storage', active: false },
  { icon: 'bell', label: 'Notifications', active: false },
  { icon: 'palette', label: 'Theme', active: false },
  { icon: 'key-round', label: 'API', active: false }
];
