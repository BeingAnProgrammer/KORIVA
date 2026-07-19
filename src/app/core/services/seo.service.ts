import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '../constants/seo.constants';
import { SeoPageData } from '../models/seo.model';

const STRUCTURED_DATA_ID = 'structured-data';

/**
 * Central place for per-route SEO metadata: <title>, description, canonical,
 * Open Graph, Twitter Card, and optional JSON-LD structured data. Feature
 * routes call `setPage()` from a resolver or the page component's
 * constructor so every route stays independently crawlable/shareable.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  setPage(data: SeoPageData): void {
    const fullTitle = `${data.title} · ${SITE_NAME}`;
    const url = `${SITE_URL}${data.path}`;
    const image = data.image ?? DEFAULT_OG_IMAGE;
    const type = data.type ?? 'website';

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonicalUrl(url);
  }

  setStructuredData(json: Record<string, unknown>): void {
    this.removeStructuredData();

    const script = this.document.createElement('script');
    script.id = STRUCTURED_DATA_ID;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(json);
    this.document.head.appendChild(script);
  }

  removeStructuredData(): void {
    this.document.getElementById(STRUCTURED_DATA_ID)?.remove();
  }

  private setCanonicalUrl(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }
}
