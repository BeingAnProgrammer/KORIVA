/** A platform capability, as shown on the landing page features grid. */
export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

/** A feature-grid card enriched with its accent colour and chip content. */
export interface FeatureCard extends Feature {
  color: string;
  softColor: string;
  badge: string;
  meta: string;
  tags: string[];
}
