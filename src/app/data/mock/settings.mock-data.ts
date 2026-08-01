import { ConnectionItem } from '../models/connection-item.model';
import { ToggleItem } from '../models/toggle-item.model';

export const TOGGLE_ITEMS: readonly ToggleItem[] = [
  { id: 't-join', label: 'Join my calendar meetings automatically', note: 'Koriva dials in two minutes early and announces itself.', on: true },
  { id: 't-min', label: 'Write minutes without being asked', note: 'Filed within four minutes of the call ending.', on: true },
  { id: 't-prom', label: 'Track promises people make out loud', note: 'Only for internal attendees.', on: true },
  { id: 't-brief', label: 'Send me a morning briefing', note: '07:30 local, weekdays only.', on: true },
  { id: 't-rec', label: 'Keep recordings after minutes are written', note: 'Deleted after 30 days when off.', on: false }
];

export const CONNECTIONS: readonly ConnectionItem[] = [
  { name: 'Google Calendar', status: 'Connected · 2 calendars', connected: true },
  { name: 'Google Meet', status: 'Connected', connected: true },
  { name: 'Zoom', status: 'Connected · bot admitted automatically', connected: true },
  { name: 'Microsoft Teams', status: 'Not connected', connected: false },
  { name: 'Slack', status: 'Posts minutes to #meetings', connected: true }
];
