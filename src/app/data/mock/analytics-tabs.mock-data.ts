import { AnalyticsTabData } from '../models/analytics-tab.model';

/** X-axis month labels for the monthly bar chart — shared by every tab. */
export const ANALYTICS_MONTHS: readonly string[] = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

/** Ported verbatim from the reference design's `AN` object. */
export const ANALYTICS_TABS: readonly AnalyticsTabData[] = [
  {
    key: 'meetings',
    label: 'Meetings',
    chartTitle: 'Meetings Koriva attended',
    monthlyValues: [38, 41, 47, 44, 39, 42],
    stats: [
      { label: 'Meetings this month', value: '42', delta: '+7% vs Jul' },
      { label: 'Hours in meetings', value: '61h', delta: '−4h vs Jul' },
      { label: 'Minutes written', value: '41', delta: '98% coverage' },
      { label: 'Median length', value: '38m', delta: '−6m vs Jul' }
    ],
    split: [
      { label: 'Development', percent: 34 },
      { label: 'Sales', percent: 24 },
      { label: 'Product', percent: 17 },
      { label: 'Client', percent: 14 },
      { label: 'Hiring', percent: 11 }
    ]
  },
  {
    key: 'decisions',
    label: 'Decisions',
    chartTitle: 'Decisions extracted',
    monthlyValues: [72, 81, 96, 88, 79, 96],
    stats: [
      { label: 'Decisions this month', value: '96', delta: '+21% vs Jul' },
      { label: 'Revisited decisions', value: '11', delta: 'same as Jul' },
      { label: 'Median time to decide', value: '2 meetings', delta: '−1' },
      { label: 'Unowned outcomes', value: '7', delta: '+2 vs Jul' }
    ],
    split: [
      { label: 'Product', percent: 31 },
      { label: 'Engineering', percent: 27 },
      { label: 'Sales', percent: 19 },
      { label: 'Legal', percent: 13 },
      { label: 'Marketing', percent: 10 }
    ]
  },
  {
    key: 'promises',
    label: 'Promises',
    chartTitle: 'Promises made vs kept',
    monthlyValues: [54, 61, 58, 66, 60, 71],
    stats: [
      { label: 'Open promises', value: '17', delta: '3 late' },
      { label: 'Kept on time', value: '78%', delta: '+5 pts' },
      { label: 'Average slip', value: '6 days', delta: '−2 days' },
      { label: 'Oldest open', value: '21 days', delta: 'Northwind scope' }
    ],
    split: [
      { label: 'Engineering', percent: 38 },
      { label: 'Sales', percent: 22 },
      { label: 'Legal', percent: 16 },
      { label: 'Client success', percent: 14 },
      { label: 'Marketing', percent: 10 }
    ]
  }
];
