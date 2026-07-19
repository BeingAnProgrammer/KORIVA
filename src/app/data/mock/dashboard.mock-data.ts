import { Insight } from '../models/insight.model';
import { Kpi } from '../models/kpi.model';
import { MeetingSummary } from '../models/meeting-summary.model';
import { TeamActivity } from '../models/team-activity.model';
import { UpcomingMeeting } from '../models/upcoming-meeting.model';

export const KPIS: readonly Kpi[] = [
  { label: 'Upcoming meetings', value: '8', delta: 'This week', deltaType: 'flat', icon: 'calendar-clock' },
  { label: 'Completed meetings', value: '46', delta: '+11 vs last month', deltaType: 'up', icon: 'calendar-check' },
  { label: 'Total meeting hours', value: '128', delta: '+12.4%', deltaType: 'up', icon: 'clock' },
  { label: 'Pending action items', value: '17', delta: '3 overdue', deltaType: 'warn', icon: 'square-check-big' },
  { label: 'MOMs generated', value: '342', delta: '+8.1%', deltaType: 'up', icon: 'file-text' },
  { label: 'AI insights', value: '24', delta: 'New this week', deltaType: 'flat', icon: 'sparkles' }
];

export const UPCOMING_MEETINGS: readonly UpcomingMeeting[] = [
  { title: 'Q4 pipeline review', type: 'Sales', date: 'Today', time: '2:00 PM', platform: 'Zoom', people: '6', status: 'Confirmed', statusVariant: 'accent' },
  { title: 'Mobile app architecture', type: 'Development', date: 'Today', time: '4:30 PM', platform: 'Google Meet', people: '5', status: 'Live', statusVariant: 'rust' },
  { title: 'Brand refresh kickoff', type: 'Marketing', date: 'Tomorrow', time: '10:00 AM', platform: 'Teams', people: '8', status: 'Confirmed', statusVariant: 'accent' },
  { title: 'Candidate — Staff Engineer', type: 'Interview', date: 'Tomorrow', time: '1:00 PM', platform: 'Zoom', people: '3', status: 'Pending', statusVariant: 'ochre' },
  { title: 'Weekly leadership sync', type: 'Leadership', date: 'Thu', time: '9:00 AM', platform: 'Teams', people: '7', status: 'Confirmed', statusVariant: 'accent' }
];

export const RECENT_MEETINGS: readonly MeetingSummary[] = [
  { title: 'Q3 sales review', type: 'Sales', date: 'Oct 14', duration: '52m', actionsCount: 6, summary: 'Pipeline up 8.1% QoQ; enterprise segment ahead of plan, mid-market lagging on renewals.' },
  { title: 'Development standup', type: 'Development', date: 'Oct 14', duration: '18m', actionsCount: 4, summary: 'API integration on track for Friday; one blocker on Azure OpenAI rate limits raised.' },
  { title: 'Product roadmap Q4', type: 'Product', date: 'Oct 12', duration: '1h 04m', actionsCount: 9, summary: 'Three roadmap bets confirmed; knowledge search moved to top priority for the quarter.' },
  { title: 'Client — Northwind', type: 'Client', date: 'Oct 11', duration: '41m', actionsCount: 5, summary: 'Client requested SSO and audit logs before renewal; commercial terms broadly agreed.' }
];

export const TEAM_ACTIVITY: readonly TeamActivity[] = [
  { initials: 'PN', who: 'Priya Nair', what: 'completed 2 action items from Dev standup', when: '12m ago' },
  { initials: 'MK', who: 'Marcus Kane', what: 'exported the Q3 sales MOM to PDF', when: '1h ago' },
  { initials: 'SL', who: 'Sofia Lund', what: 'commented on Product roadmap Q4', when: '2h ago' },
  { initials: 'DT', who: 'Devon Tran', what: 'scheduled Brand refresh kickoff', when: '3h ago' }
];

export const INSIGHTS: readonly Insight[] = [
  { icon: 'trending-up', text: 'Enterprise deals mentioned 34% more this month — pipeline sentiment is trending positive.' },
  { icon: 'alarm-clock', text: '3 action items from client meetings are overdue. Northwind SSO is the oldest.' },
  { icon: 'repeat', text: 'Azure OpenAI has surfaced in 6 meetings this quarter, mostly around rate limits.' }
];
