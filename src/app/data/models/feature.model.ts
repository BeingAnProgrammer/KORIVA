/** A platform capability, as shown in the landing page's features showcase. */
export interface Feature {
  icon: string;
  title: string;
  desc: string;
  /** Featured tiles render larger (bento-style) — reserved for capabilities with their own deep-dive section elsewhere on the page. */
  featured?: boolean;
}
