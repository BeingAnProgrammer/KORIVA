/** A platform capability, as shown in the landing page's features showcase. */
export interface Feature {
  icon: string;
  title: string;
  desc: string;
  /** CSS color value (e.g. `var(--story-capture)`) tinting this feature's list icon and panel. */
  color?: string;
}
