import { NavItem } from '../models/nav-item.model';
import { NavPill } from '../models/nav-pill.model';

/** Marketing header pill-nav (scroll-spy anchor links). */
export const NAV_PILLS: readonly NavPill[] = [
  { name: 'How it works', href: '#how-it-works' },
  { name: 'Platform', href: '#platform' },
  { name: 'Meeting types', href: '#types' }
];

/** App top-nav links, in display order (matches the reference's nav bar exactly). */
export const APP_NAV_ITEMS: readonly NavItem[] = [
  { key: 'home', label: 'Home', route: '/app/home' },
  { key: 'meetings', label: 'Meetings', route: '/app/meetings' },
  { key: 'memory', label: 'Memory', route: '/app/memory' },
  { key: 'commitments', label: 'Commitments', route: '/app/commitments' },
  { key: 'patterns', label: 'Patterns', route: '/app/patterns' },
  { key: 'analytics', label: 'Analytics', route: '/app/analytics' },
  { key: 'settings', label: 'Settings', route: '/app/settings' }
];
