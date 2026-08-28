import { Thread } from '../models/thread.model';

/**
 * Ported verbatim from the reference design's `THREADS` array. On the four
 * `kind: 'Project'` entries, `count` and `items` are dead weight — the
 * Memory page derives both live from real meetings/commitments instead (see
 * MemoryPageComponent), so they're left at `0`/`[]` rather than a stale
 * number that could drift from what's actually shown. `note`/`facts` still
 * come from here — nothing derives those yet.
 */
export const THREADS: readonly Thread[] = [
  {
    id: 't1',
    name: 'Northwind',
    kind: 'Customer',
    count: 4,
    note: 'Expansion blocked on a promise from June.',
    items: [
      { date: '12 Sep', title: 'Kickoff', team: 'Sales', color: 'blue' },
      { date: '30 Sep', title: 'Contract review', team: 'Legal', color: 'accent' },
      { date: '11 Oct', title: 'Check-in', team: 'Client', color: 'amber' },
      { date: '14 Oct', title: 'Audit trail raised', team: 'Engineering', color: 'green' }
    ],
    facts: ['Ready to expand to 2 more teams in Q1', 'Blocked on SSO + audit-log scope (21 days late)', 'Legal needs a continuous audit trail']
  },
  {
    id: 'auth-migration',
    name: 'Auth migration',
    kind: 'Project',
    count: 0,
    note: 'Eleven days without a new blocker.',
    items: [],
    facts: ['Read path ships before the backfill', 'Search stays warm via overnight embeddings', 'Staging deploy still undated']
  },
  {
    id: 'website-redesign',
    name: 'Website Redesign',
    kind: 'Project',
    count: 0,
    note: 'Design review is in flight, with a feature demo and an iteration pass scheduled behind it.',
    items: [],
    facts: []
  },
  {
    id: 'q4-planning',
    name: 'Q4 Planning',
    kind: 'Project',
    count: 0,
    note: 'Knowledge search leads the roadmap; offline mode slipped to Q1.',
    items: [],
    facts: ['Knowledge search is the Q4 headline — 6 of 7 in favour.', 'Offline mode deferred to Q1.']
  },
  {
    id: 'customer-onboarding',
    name: 'Customer Onboarding',
    kind: 'Project',
    count: 0,
    note: 'No meetings logged yet — invite Koriva to get started.',
    items: [],
    facts: []
  },
  {
    id: 't3',
    name: 'Mid-market tiering',
    kind: 'Open question',
    count: 4,
    note: 'Raised four times, owned by nobody.',
    items: [
      { date: '5 Aug', title: 'Pricing workshop', team: 'Product', color: 'accent' },
      { date: '18 Sep', title: 'Q2 sales review', team: 'Sales', color: 'blue' },
      { date: '9 Oct', title: 'Roadmap Q4', team: 'Product', color: 'accent' },
      { date: '14 Oct', title: 'Q3 sales review', team: 'Sales', color: 'blue' }
    ],
    facts: ['Blocks Northwind expansion and Halcyon renewal', 'Deferred at every meeting it appeared in', 'No owner assigned']
  },
  {
    id: 't4',
    name: 'Priya Nair',
    kind: 'Person',
    count: 22,
    note: 'Owns two open commitments.',
    items: [
      { date: '14 Oct', title: 'Standup', team: 'Development', color: 'green' },
      { date: 'Today', title: 'Architecture call', team: 'Development', color: 'rose' }
    ],
    facts: ['Owns the overnight embedding spike (Thursday)', 'Owns the staging deploy (undated)', "Spoke most in today's architecture call"]
  }
];
