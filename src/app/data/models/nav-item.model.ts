/** App-shell sidebar navigation entry. */
export interface NavItem {
  key: string;
  label: string;
  icon: string;
  /** Route the sidebar item links to, e.g. '/app/dashboard'. */
  route: string;
}
