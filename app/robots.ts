import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/** Generated at /robots.txt (replaces the old static public/robots.txt). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          // development / diagnostic pages
          '/test',
          '/simple',
          '/es/test',
          '/en/test',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
