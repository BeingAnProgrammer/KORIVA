/** Top-nav bar entry — plain text link, no icon (matches the reference's nav). */
export interface NavItem {
  key: string;
  label: string;
  /** Route the nav item links to, e.g. '/app/home'. */
  route: string;
}
