import { Commitment } from '../models/commitment.model';

/** Ported verbatim from the reference design's `MEETINGS` array. */
export const COMMITMENTS: readonly Commitment[] = [
  {
    id: 'live',
    title: 'Mobile app architecture',
    date: 'Today',
    day: '16:30 · running',
    cat: 'Development',
    color: 'rose',
    status: 'live',
    dur: '12m so far',
    people: ['PN', 'DT', 'MK', '+2'],
    summary:
      'Migration sequencing is being settled live: read path first, embeddings backfilled overnight so search stays warm. Marcus has reopened the audit-trail question legal raised in June.',
    stats: [
      { tone: 'green', label: '2 decisions' },
      { tone: 'amber', label: '1 commitment' },
      { tone: 'orange', label: '1 risk' }
    ],
    minutes: [
      'Read path ships before the backfill — agreed by Priya, Devon, Marcus.',
      'Priya owns the overnight embedding spike, result by Thursday.',
      'Open risk: audit trail must stay intact through the cutover window (legal).'
    ],
    related: ['Development standup', 'Auth migration review']
  },
  {
    id: 'u1',
    title: 'Candidate — Staff Engineer',
    date: 'Today',
    day: '17:30 · in 40 minutes',
    cat: 'Hiring',
    color: 'accent',
    status: 'upcoming',
    dur: '45m',
    people: ['1', '2', '3'],
    summary:
      'Two earlier rounds, both recorded. Koriva compressed them into a one-page brief with the three questions nobody has asked yet.',
    stats: [
      { tone: 'accent', label: 'Brief ready' },
      { tone: 'blue', label: 'Interview template' }
    ],
    minutes: [
      'Round 1: strong on distributed systems, vague on incident ownership.',
      'Round 2: excellent design review, no discussion of mentoring.',
      'Unasked: on-call philosophy, failure they caused, why leaving now.'
    ],
    related: ['Hiring loop calibration']
  },
  {
    id: 'u2',
    title: 'Brand refresh kickoff',
    date: 'Tomorrow',
    day: '10:00',
    cat: 'Marketing',
    color: 'orange',
    status: 'upcoming',
    dur: '60m',
    people: ['1', '2', '+6'],
    summary: "No agenda attached. Koriva drafted one from last quarter's kickoff and flagged the two decisions that stalled it.",
    stats: [
      { tone: 'orange', label: 'No agenda' },
      { tone: 'amber', label: '2 stalled decisions' }
    ],
    minutes: [
      'Draft agenda proposed: positioning, naming, timeline, owners.',
      'Stalled last time: who signs off on tone, and whether the logo is in scope.'
    ],
    related: ['Q3 marketing review']
  },
  {
    id: 'm1',
    title: 'Q3 sales review',
    date: '14 Oct',
    day: 'Mon · 52m',
    cat: 'Sales',
    color: 'blue',
    status: 'done',
    dur: '52m',
    people: ['1', '2', '3', '+3'],
    summary:
      'Pipeline is up 8.1% quarter on quarter with enterprise ahead of plan, but mid-market renewals slipped for the second month — the same tiering question blocked two deals, and nobody left the room owning it.',
    stats: [
      { tone: 'green', label: '4 decisions' },
      { tone: 'amber', label: '6 commitments' },
      { tone: 'orange', label: '2 risks' }
    ],
    minutes: [
      'Enterprise quota raised 6% for Q4.',
      'Mid-market tiering decision deferred again — still unowned.',
      'Two deals explicitly waiting on tiering: Northwind expansion, Halcyon.',
      'Renewal outreach moves two weeks earlier from November.'
    ],
    related: ['Q2 sales review', 'Product roadmap Q4']
  },
  {
    id: 'm2',
    title: 'Development standup',
    date: '14 Oct',
    day: 'Mon · 18m',
    cat: 'Development',
    color: 'green',
    status: 'done',
    dur: '18m',
    people: ['1', '2', '+3'],
    summary:
      "API integration is on track for Friday. The Azure OpenAI rate limit that blocked Monday's deploy has been raised, and no new blockers were named — the eleventh consecutive standup without one.",
    stats: [
      { tone: 'green', label: '2 decisions' },
      { tone: 'amber', label: '4 commitments' }
    ],
    minutes: [
      'Rate limit raised to 240k TPM — deploy unblocked.',
      'API integration target holds for Friday.',
      'Staging deploy still owned by Priya, no date given.'
    ],
    related: ['Mobile app architecture', 'Auth migration review']
  },
  {
    id: 'm3',
    title: 'Northwind check-in',
    date: '11 Oct',
    day: 'Fri · 34m',
    cat: 'Client',
    color: 'amber',
    status: 'done',
    dur: '34m',
    people: ['1', '2', '+2'],
    summary:
      'Northwind asked again for the SSO and audit-log scope promised in June. They are otherwise ready to expand to two more teams next quarter — the scope is the only thing in the way.',
    stats: [
      { tone: 'green', label: '1 decision' },
      { tone: 'rose', label: '1 promise 21 days late' }
    ],
    minutes: [
      'Expansion to 2 more teams agreed in principle for Q1.',
      'SSO + audit-log scope still not sent — 21 days late, Marcus.',
      'They will not sign the expansion before the scope arrives.'
    ],
    related: ['Contract review · Legal', 'Kickoff · Sales']
  },
  {
    id: 'm4',
    title: 'Product roadmap Q4',
    date: '9 Oct',
    day: 'Wed · 71m',
    cat: 'Product',
    color: 'accent',
    status: 'done',
    dur: '71m',
    people: ['1', '2', '3', '+4'],
    summary:
      'Knowledge search moved to the top of the Q4 roadmap, agreed by six of seven. The offline mode work slides to Q1 to pay for it.',
    stats: [
      { tone: 'green', label: '5 decisions' },
      { tone: 'amber', label: '3 commitments' },
      { tone: 'orange', label: '1 risk' }
    ],
    minutes: [
      'Knowledge search is the Q4 headline — 6 of 7 in favour.',
      'Offline mode deferred to Q1.',
      'Risk: search depends on the auth migration finishing first.'
    ],
    related: ['Q3 sales review', 'Auth migration review']
  },
  {
    id: 'm5',
    title: 'Contract review · Legal',
    date: '30 Sep',
    day: 'Mon · 46m',
    cat: 'Legal',
    color: 'accent',
    status: 'done',
    dur: '46m',
    people: ['1', '2'],
    summary:
      'Legal will not approve the Northwind expansion without an intact audit trail through any migration window — the same constraint engineering hit this week.',
    stats: [
      { tone: 'green', label: '2 decisions' },
      { tone: 'orange', label: '1 risk' }
    ],
    minutes: ['Audit trail must be continuous through migrations — non-negotiable.', 'Northwind MSA redlines returned, two clauses open.'],
    related: ['Northwind check-in', 'Mobile app architecture']
  }
];
