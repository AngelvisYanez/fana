import { OG_IMAGE, SITE_NAME, SITE_URL, SOCIAL_LINKS, type SiteLocale } from '@/lib/seo';

/** Structured data (Organization / LocalBusiness + WebSite) for search engines and AI assistants. */
export default function JsonLd({ locale }: { locale: SiteLocale }) {
  const description =
    locale === 'es'
      ? 'Centro de fresado dental CNC de 5 ejes en el sur de Florida: estructuras para implantes, coronas, puentes y estética avanzada.'
      : '5-axis CNC dental milling center in South Florida: implant frameworks, crowns, bridges and advanced aesthetics.';

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        legalName: 'FANA GROUP CORP',
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo/logo-fana-1.png`,
        image: OG_IMAGE.url,
        description,
        telephone: '+1-786-881-7017',
        email: 'info@fanamillingcenter.com',
        // Street address intentionally omitted: the site only publishes the service area.
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Miami',
          addressRegion: 'FL',
          postalCode: '33178',
          addressCountry: 'US',
        },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Broward County, FL' },
          { '@type': 'AdministrativeArea', name: 'Miami-Dade County, FL' },
          { '@type': 'AdministrativeArea', name: 'Palm Beach County, FL' },
        ],
        knowsLanguage: ['es', 'en'],
        sameAs: SOCIAL_LINKS,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: ['es', 'en'],
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
