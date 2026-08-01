import { Pattern } from '../models/pattern.model';

/** Ported verbatim from the reference design's `PATTERNS` array. */
export const PATTERNS: readonly Pattern[] = [
  {
    id: 'p1',
    title: 'Pricing pushback is accelerating',
    trend: '8 meetings this month',
    dir: 'up',
    color: 'rose',
    detail:
      "It stopped being one segment's objection. Mid-market brought it up five times, enterprise three. Two deals are now blocked on the same unowned tiering question.",
    evidence: [
      'Q3 sales review — "the same tiering question blocked two deals"',
      'Northwind check-in — expansion priced per team, no answer',
      'Halcyon renewal — asked for a middle tier twice'
    ]
  },
  {
    id: 'p2',
    title: 'Week-one onboarding friction, in the same words',
    trend: '5 customers',
    dir: 'flat',
    color: 'orange',
    detail:
      'Five separate customers described the first week using nearly identical language: too many settings before any value. Nobody has raised it in a product meeting.',
    evidence: [
      'We spent the first week configuring, not using.',
      'Too many decisions before the first import.',
      'Our admins bounced off the permissions screen.'
    ]
  },
  {
    id: 'p3',
    title: 'Auth migration has gone quiet — in the good way',
    trend: '11 days, no blockers',
    dir: 'down',
    color: 'blue',
    detail:
      'Eleven consecutive standups without a new blocker, the longest stretch this year. The only loose thread is an undated staging deploy.',
    evidence: ['Development standup — rate limit raised, deploy unblocked', 'Mobile app architecture — read path sequencing agreed']
  },
  {
    id: 'p4',
    title: 'Rate limits have blocked a launch three times',
    trend: '3 times this quarter',
    dir: 'up',
    color: 'amber',
    detail: 'Three separate launches slipped for the same infrastructure reason. Each time it was treated as a one-off.',
    evidence: ['July — embeddings backfill throttled', 'September — evaluation run capped', 'October — Monday deploy blocked']
  },
  {
    id: 'p5',
    title: 'Northwind is one conversation in four rooms',
    trend: '4 meetings, 4 teams',
    dir: 'flat',
    color: 'accent',
    detail: 'Sales, legal, client success and engineering each keep their own version of the truth. Two of them are waiting on the same promise.',
    evidence: ['Kickoff · Sales, 12 Sep', 'Contract review · Legal, 30 Sep', 'Check-in · Client, 11 Oct', 'Audit trail raised · Engineering, 14 Oct']
  }
];
