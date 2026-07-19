export type KpiDeltaType = 'flat' | 'up' | 'warn';

/** A dashboard/analytics KPI tile. */
export interface Kpi {
  label: string;
  value: string;
  delta: string;
  icon: string;
  deltaType: KpiDeltaType;
}
