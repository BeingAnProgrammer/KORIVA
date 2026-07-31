import { KpiDeltaType } from './kpi.model';

/** A cross-meeting pattern signal on the dashboard's "Recent intelligence" feed — a topic
 *  surfacing across multiple meetings, not a single meeting summary. */
export interface IntelligenceSignal {
  icon: string;
  topic: string;
  meetingCount: number;
  trend: string;
  trendType: KpiDeltaType;
}
