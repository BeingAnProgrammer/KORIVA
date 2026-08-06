export interface SegmentedOption<T = string> {
  value: T;
  label: string;
  icon?: string;
  /** Optional count badge shown after the label (e.g. Commitments filter tabs). */
  count?: number;
}
