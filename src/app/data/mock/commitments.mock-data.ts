import { ActionItem } from '../models/action-item.model';

/** Ported verbatim from the reference design's `COMMITMENTS` array. */
export const COMMITMENTS: readonly ActionItem[] = [
  {
    id: 1,
    task: 'Send Northwind the SSO + audit-log scope',
    owner: 'Marcus K.',
    due: '21 days late',
    meeting: 'Northwind check-in',
    meetingId: 'm3',
    statusVariant: 'rose',
    late: true,
    done: false,
    quote: '"I\'ll get you the SSO and audit-log scope by end of week." — 20 Jun'
  },
  {
    id: 2,
    task: 'Find an owner for mid-market tiering',
    owner: 'Unassigned',
    due: 'Raised in 4 meetings',
    meeting: 'Q3 sales review',
    meetingId: 'm1',
    statusVariant: 'rose',
    late: true,
    done: false,
    quote: '"We should decide the tiering before renewals season." — 14 Oct'
  },
  {
    id: 3,
    task: 'Read the two earlier interview rounds',
    owner: 'You',
    due: 'Today, 17:30',
    meeting: 'Candidate — Staff Engineer',
    meetingId: 'u1',
    statusVariant: 'amber',
    late: false,
    done: false,
    quote: '"I\'ll review the transcripts before we meet him." — 12 Oct'
  },
  {
    id: 4,
    task: 'Ship the overnight embedding spike',
    owner: 'Priya N.',
    due: 'Thursday',
    meeting: 'Mobile app architecture',
    meetingId: 'live',
    statusVariant: 'amber',
    late: false,
    done: false,
    quote: '"I\'ll take the overnight backfill spike." — today, 16:38'
  },
  {
    id: 5,
    task: 'Date the staging deploy',
    owner: 'Priya N.',
    due: 'No date given',
    meeting: 'Development standup',
    meetingId: 'm2',
    statusVariant: 'rose',
    late: true,
    done: false,
    quote: '"Staging is mine, I just can\'t promise a day yet." — 14 Oct'
  },
  {
    id: 6,
    task: 'Move renewal outreach two weeks earlier',
    owner: 'Dana R.',
    due: 'From November',
    meeting: 'Q3 sales review',
    meetingId: 'm1',
    statusVariant: 'amber',
    late: false,
    done: false,
    quote: '"We start renewals two weeks earlier from November." — 14 Oct'
  },
  {
    id: 7,
    task: 'Return the Northwind MSA redlines',
    owner: 'Legal',
    due: 'Done 1 Oct',
    meeting: 'Contract review · Legal',
    meetingId: 'm5',
    statusVariant: 'green',
    late: false,
    done: true,
    quote: '"Redlines back to you Tuesday." — 30 Sep'
  }
];
