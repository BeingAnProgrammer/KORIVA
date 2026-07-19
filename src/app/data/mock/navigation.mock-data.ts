import { MeetingTab } from '../models/meeting-tab.model';
import { NavItem } from '../models/nav-item.model';
import { NavPill } from '../models/nav-pill.model';

/** Marketing header pill-nav (scroll-spy anchor links). */
export const NAV_PILLS: readonly NavPill[] = [
  { name: 'Features', href: '#features' },
  { name: 'Meeting types', href: '#types' },
  { name: 'AI assistant', href: '#ai' }
];

/** App-shell sidebar navigation, in display order. */
export const APP_NAV_ITEMS: readonly NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', route: '/app/dashboard' },
  { key: 'meetings', label: 'Meetings', icon: 'calendar-days', route: '/app/meetings' },
  { key: 'ai', label: 'AI Assistant', icon: 'sparkles', route: '/app/ai-assistant' },
  { key: 'knowledge', label: 'Knowledge base', icon: 'library', route: '/app/knowledge-base' },
  { key: 'analytics', label: 'Analytics', icon: 'bar-chart-3', route: '/app/analytics' },
  { key: 'recordings', label: 'Recordings', icon: 'clapperboard', route: '/app/recordings' },
  { key: 'templates', label: 'Templates', icon: 'layout-template', route: '/app/templates' },
  { key: 'actions', label: 'Action items', icon: 'square-check-big', route: '/app/action-items' },
  { key: 'teams', label: 'Teams', icon: 'users', route: '/app/teams' },
  { key: 'automations', label: 'Automations', icon: 'workflow', route: '/app/automations' },
  { key: 'settings', label: 'Settings', icon: 'settings', route: '/app/settings' }
];

/** Meeting-detail tab strip, in display order. */
export const MEETING_TABS: readonly MeetingTab[] = [
  { key: 'overview', label: 'Overview', icon: 'layout-list' },
  { key: 'transcript', label: 'Transcript', icon: 'captions' },
  { key: 'mom', label: 'MOM', icon: 'file-text' },
  { key: 'recording', label: 'Recording', icon: 'clapperboard' },
  { key: 'analytics', label: 'Analytics', icon: 'bar-chart-3' },
  { key: 'actions', label: 'Action items', icon: 'square-check-big' },
  { key: 'ai', label: 'AI assistant', icon: 'sparkles' }
];
