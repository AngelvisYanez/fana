import type { MetadataRoute } from 'next';
import { LAST_MODIFIED, LOCALES, PAGES, pageAlternates, pageUrl, type PageKey } from '@/lib/seo';

/** Generated at /sitemap.xml: every page in both languages, with hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(PAGES) as PageKey[];

  return keys.flatMap((key) =>
    LOCALES.map((locale) => ({
      url: pageUrl(locale, key),
      lastModified: LAST_MODIFIED,
      changeFrequency: PAGES[key].changeFrequency,
      priority: PAGES[key].priority,
      alternates: { languages: pageAlternates(locale, key).languages },
    })),
  );
}
