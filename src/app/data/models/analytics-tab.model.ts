export type AnalyticsTabKey = 'meetings' | 'decisions' | 'promises';

/** One stat tile (label + big number + delta caption). */
export interface AnalyticsStat {
  label: string;
  value: string;
  delta: string;
}

/** One row in the "Where time goes" category breakdown. */
export interface AnalyticsSplitItem {
  label: string;
  percent: number;
}

/** Everything the Analytics page shows for one tab (Meetings/Decisions/Promises). */
export interface AnalyticsTabData {
  key: AnalyticsTabKey;
  label: string;
  chartTitle: string;
  monthlyValues: readonly number[];
  stats: readonly AnalyticsStat[];
  split: readonly AnalyticsSplitItem[];
}
