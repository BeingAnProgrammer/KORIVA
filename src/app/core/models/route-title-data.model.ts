/** Route `data` shape consumed by the app-shell top header via RouteDataService. */
export interface RouteTitleData {
  title?: string;
  backLink?: { route: string; label: string };
}
