import { IntelligenceSignal } from '../models/intelligence-signal.model';
import { Insight } from '../models/insight.model';
import { Kpi } from '../models/kpi.model';
import { MeetingSummary } from '../models/meeting-summary.model';
import { NeedsAttentionItem } from '../models/needs-attention-item.model';
import { UpcomingMeeting } from '../models/upcoming-meeting.model';

/** Example prompts for the dashboard's AI Search Hero — doubles as the "popular questions" chip row. */
export const POPULAR_QUESTIONS: readonly string[] = [
  "Summarize last week's meetings",
  'What decisions were made?',
  'Show overdue action items',
  'What did customers complain about?',
  'What blockers were discussed?'
];

export const KPIS: readonly Kpi[] = [
  { label: 'Upcoming meetings', value: '8', delta: 'This week', deltaType: 'flat', icon: 'calendar-clock' },
  { label: 'Open action items', value: '17', delta: '3 overdue', deltaType: 'warn', icon: 'square-check-big' },
  { label: 'Meeting hours', value: '128', delta: '+12.4% this month', deltaType: 'up', icon: 'clock' },
  { label: 'Knowledge added', value: '342', delta: 'MOMs indexed', deltaType: 'up', icon: 'library' }
];

export const NEEDS_ATTENTION: readonly NeedsAttentionItem[] = [
  {
    icon: 'alarm-clock',
    label: 'Overdue action items',
    description: '3 action items are past due, including the Northwind SSO requirement.',
    route: '/app/action-items'
  },
  {
    icon: 'file-x',
    label: 'Missing meeting summary',
    description: '"Client — Acme renewal" finished 2 days ago but has no MOM generated yet.',
    route: '/app/meetings'
  },
  {
    icon: 'circle-help',
    label: 'Unresolved decision',
    description: "Enterprise self-serve pricing is still open from last week's roadmap review.",
    route: '/app/intelligence'
  },
  {
    icon: 'triangle-alert',
    label: 'Failed meeting processing',
    description: '"Design sync — Oct 9" failed to transcribe. Audio may be corrupted.',
    route: '/app/meetings'
  }
];

/** Cross-meeting pattern signals — a topic surfacing across multiple meetings, not a single meeting summary. */
export const INTELLIGENCE_FEED: readonly IntelligenceSignal[] = [
  { icon: 'trending-up', topic: 'Pricing concerns', meetingCount: 8, trend: '+34%', trendType: 'warn' },
  { icon: 'trending-up', topic: 'Customer onboarding issues', meetingCount: 6, trend: 'Trending up', trendType: 'warn' },
  { icon: 'repeat', topic: 'Authentication migration', meetingCount: 5, trend: 'Steady', trendType: 'flat' },
  { icon: 'megaphone', topic: 'Competitor mentions', meetingCount: 4, trend: '+34%', trendType: 'up' }
];

export const UPCOMING_MEETINGS: readonly UpcomingMeeting[] = [
  { title: 'Q4 pipeline review', type: 'Sales', date: 'Today', time: '2:00 PM', platform: 'Zoom', people: '6', status: 'Confirmed', statusVariant: 'accent' },
  { title: 'Mobile app architecture', type: 'Development', date: 'Today', time: '4:30 PM', platform: 'Google Meet', people: '5', status: 'Live', statusVariant: 'rust' },
  { title: 'Brand refresh kickoff', type: 'Marketing', date: 'Tomorrow', time: '10:00 AM', platform: 'Teams', people: '8', status: 'Confirmed', statusVariant: 'accent' },
  { title: 'Candidate — Staff Engineer', type: 'Interview', date: 'Tomorrow', time: '1:00 PM', platform: 'Zoom', people: '3', status: 'Pending', statusVariant: 'ochre' },
  { title: 'Weekly leadership sync', type: 'Leadership', date: 'Thu', time: '9:00 AM', platform: 'Teams', people: '7', status: 'Confirmed', statusVariant: 'accent' }
];

export const RECENT_MEETINGS: readonly MeetingSummary[] = [
  {
    title: 'Q3 sales review',
    type: 'Sales',
    date: 'Oct 14',
    duration: '52m',
    actionsCount: 6,
    participants: '5 people',
    summary: 'Pipeline up 8.1% QoQ; enterprise segment ahead of plan, mid-market lagging on renewals.'
  },
  {
    title: 'Development standup',
    type: 'Development',
    date: 'Oct 14',
    duration: '18m',
    actionsCount: 4,
    participants: '4 people',
    summary: 'API integration on track for Friday; one blocker on Azure OpenAI rate limits raised.'
  },
  {
    title: 'Product roadmap Q4',
    type: 'Product',
    date: 'Oct 12',
    duration: '1h 04m',
    actionsCount: 9,
    participants: '7 people',
    summary: 'Three roadmap bets confirmed; knowledge search moved to top priority for the quarter.'
  },
  {
    title: 'Client — Northwind',
    type: 'Client',
    date: 'Oct 11',
    duration: '41m',
    actionsCount: 5,
    participants: '3 people',
    summary: 'Client requested SSO and audit logs before renewal; commercial terms broadly agreed.'
  }
];

export const INSIGHTS: readonly Insight[] = [
  { icon: 'trending-up', text: 'Most discussed topic this month: enterprise pricing, surfaced in 8 meetings.' },
  { icon: 'users', text: 'Product team has the highest meeting activity — 19 sessions in the last 30 days.' },
  { icon: 'alarm-clock', text: 'Emerging customer concern: onboarding friction, mentioned in 6 of the last 10 client calls.' }
];
