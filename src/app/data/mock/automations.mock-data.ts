import { Automation } from '../models/automation.model';

/**
 * Note: the design's 6th row uses a `slack` icon, which has no equivalent in
 * Lucide's icon set (brand marks were removed from core Lucide years ago) —
 * `message-square` is used in its place; everything else is verbatim.
 */
export const AUTOMATIONS: readonly Automation[] = [
  { icon: 'bot', title: 'Auto-join and record', description: 'A bot joins every scheduled meeting and starts recording.', enabled: true },
  { icon: 'file-text', title: 'Generate MOM on end', description: 'Minutes are drafted the moment a meeting ends.', enabled: true },
  { icon: 'send', title: 'Email MOM to attendees', description: 'Send the finished minutes to all participants automatically.', enabled: true },
  { icon: 'square-check-big', title: 'Sync action items to tasks', description: 'Push extracted action items to your task manager.', enabled: false },
  { icon: 'alarm-clock', title: 'Nudge overdue owners', description: 'Remind owners 24h before an action item is due.', enabled: true },
  { icon: 'message-square', title: 'Post summary to Slack', description: 'Drop a short recap in the relevant channel.', enabled: false }
];
