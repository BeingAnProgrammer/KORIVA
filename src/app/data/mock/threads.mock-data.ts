import { Thread } from '../models/thread.model';

/** Ported verbatim from the reference design's `THREADS` array. */
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
    id: 't2',
    name: 'Auth migration',
    kind: 'Project',
    count: 9,
    note: 'Eleven days without a new blocker.',
    items: [
      { date: '22 Sep', title: 'Design review', team: 'Engineering', color: 'accent' },
      { date: '2 Oct', title: 'Rate limit raised', team: 'Engineering', color: 'green' },
      { date: '14 Oct', title: 'Standup', team: 'Development', color: 'green' },
      { date: 'Today', title: 'Architecture call', team: 'Development', color: 'rose' }
    ],
    facts: ['Read path ships before the backfill', 'Search stays warm via overnight embeddings', 'Staging deploy still undated']
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
