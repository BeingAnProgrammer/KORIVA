export interface BarChartItem {
  /** Bar height as a percentage of the chart's fixed height (0-100). */
  value: number;
  /** Highlighted bars use the solid accent colour instead of the soft tint. */
  emphasis?: boolean;
}
