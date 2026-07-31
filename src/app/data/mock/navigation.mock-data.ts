import { MeetingTab } from '../models/meeting-tab.model';
import { NavItem } from '../models/nav-item.model';
import { NavPill } from '../models/nav-pill.model';

/** Marketing header pill-nav (scroll-spy anchor links). */
export const NAV_PILLS: readonly NavPill[] = [
  { name: 'How it works', href: '#how-it-works' },
  { name: 'Platform', href: '#platform' },
  { name: 'Meeting types', href: '#types' }
];

// Settings lives outside this list — rendered as its own static link below
// the workspace nav in the sidebar template, visually separated by a
// divider, since it's a workspace-config destination rather than one of
// the core Meeting → Intelligence → Action workflow steps.
/** App-shell sidebar navigation, in display order. */
export const APP_NAV_ITEMS: readonly NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', route: '/app/dashboard' },
  { key: 'meetings', label: 'Meetings', icon: 'calendar-days', route: '/app/meetings' },
  { key: 'intelligence', label: 'Intelligence', icon: 'sparkles', route: '/app/intelligence' },
  { key: 'actions', label: 'Action items', icon: 'square-check-big', route: '/app/action-items' },
  { key: 'analytics', label: 'Analytics', icon: 'bar-chart-3', route: '/app/analytics' }
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
