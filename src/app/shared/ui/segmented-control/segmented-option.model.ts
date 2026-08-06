export interface SegmentedOption<T = string> {
  value: T;
  label: string;
  icon?: string;
  /** Image path for a full-color brand mark (e.g. Zoom/Teams/Meet) — takes precedence over `icon` when set. */
  iconSrc?: string;
  /** Optional count badge shown after the label (e.g. Commitments filter tabs). */
  count?: number;
}
