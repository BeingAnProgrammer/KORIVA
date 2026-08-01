export interface SeoPageData {
  /** Rendered as both <title> and og:title / twitter:title. */
  title: string;
  description: string;
  /** Route path, e.g. '/app/home' — used to build canonical + og:url. */
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
}
