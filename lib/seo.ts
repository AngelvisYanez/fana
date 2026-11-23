import type { Metadata } from 'next';

export const SITE_URL = 'https://fanamillingcenter.com';
export const SITE_NAME = 'FANA Milling Center';
export const LOCALES = ['es', 'en'] as const;
export type SiteLocale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: SiteLocale = 'es';

/** Social / search preview image. Replace with a dedicated 1200 × 630 file when available. */
export const OG_IMAGE = { url: `${SITE_URL}/images/about/about-hero.jpg`, width: 1584, height: 672 };

/** Update when the content of the site changes in a relevant way. */
export const LAST_MODIFIED = '2026-11-23';

export const SOCIAL_LINKS = [
  'https://www.instagram.com/fanamillingcenter/',
  'https://www.linkedin.com/company/fana-milling-center',
];

export type PageKey =
  | 'home'
  | 'about'
  | 'services'
  | 'materials'
  | 'contact'
  | 'privacy'
  | 'cookies'
  | 'terms';

interface PageSeo {
  /** Path after /{locale}. Empty string = home. */
  path: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
  es: { title: string; description: string };
  en: { title: string; description: string };
}

export const PAGES: Record<PageKey, PageSeo> = {
  home: {
    path: '',
    priority: 1,
    changeFrequency: 'weekly',
    es: {
      title: 'FANA Milling Center | Laboratorio de fresado dental CAD/CAM en Florida',
      description:
        'Centro de fresado dental CNC de 5 ejes en el sur de Florida. Estructuras para implantes, coronas, puentes y estética avanzada con precisión de 5 μm y entrega en 24 h.',
    },
    en: {
      title: 'FANA Milling Center | CAD/CAM Dental Milling Laboratory in Florida',
      description:
        '5-axis CNC dental milling center in South Florida. Implant frameworks, crowns, bridges and advanced aesthetics with 5 μm precision and 24-hour turnaround.',
    },
  },
  about: {
    path: '/nosotros',
    priority: 0.8,
    changeFrequency: 'monthly',
    es: {
      title: 'Nosotros | FANA Milling Center',
      description:
        'Conoce a FANA Milling Center: más de 4 años fabricando estructuras y restauraciones dentales con fresado CNC de 5 ejes para laboratorios y clínicas del sur de Florida.',
    },
    en: {
      title: 'About Us | FANA Milling Center',
      description:
        'Meet FANA Milling Center: more than 4 years producing dental frameworks and restorations with 5-axis CNC milling for laboratories and clinics in South Florida.',
    },
  },
  services: {
    path: '/servicios',
    priority: 0.9,
    changeFrequency: 'monthly',
    es: {
      title: 'Servicios de fresado dental | FANA Milling Center',
      description:
        'Fresado de estructuras para implantes, coronas y puentes, estética avanzada y restauraciones provisionales. Flujo digital CAD/CAM con precisión de 5 μm.',
    },
    en: {
      title: 'Dental Milling Services | FANA Milling Center',
      description:
        'Milling of implant frameworks, crowns and bridges, advanced aesthetics and provisional restorations. Digital CAD/CAM workflow with 5 μm precision.',
    },
  },
  materials: {
    path: '/materiales',
    priority: 0.8,
    changeFrequency: 'monthly',
    es: {
      title: 'Materiales dentales | FANA Milling Center',
      description:
        'Zirconio multicapa, disilicato de litio, PMMA y cera de fresado. Materiales certificados y biocompatibles, fresados en máquinas CNC de 5 ejes.',
    },
    en: {
      title: 'Dental Materials | FANA Milling Center',
      description:
        'Multilayer zirconia, lithium disilicate, PMMA and milling wax. Certified, biocompatible materials milled on 5-axis CNC machines.',
    },
  },
  contact: {
    path: '/contacto',
    priority: 0.8,
    changeFrequency: 'yearly',
    es: {
      title: 'Contacto y cotización | FANA Milling Center',
      description:
        'Envíanos tu caso o solicita una cotización. Atendemos laboratorios y clínicas de Broward, Miami-Dade y Palm Beach. Teléfono +1 (786) 881-7017.',
    },
    en: {
      title: 'Contact and Quotes | FANA Milling Center',
      description:
        'Send us your case or request a quote. We serve laboratories and clinics in Broward, Miami-Dade and Palm Beach. Phone +1 (786) 881-7017.',
    },
  },
  privacy: {
    path: '/politica-privacidad',
    priority: 0.3,
    changeFrequency: 'yearly',
    es: {
      title: 'Política de privacidad | FANA Milling Center',
      description: 'Cómo FANA Milling Center trata y protege los datos personales de sus clientes y visitantes.',
    },
    en: {
      title: 'Privacy Policy | FANA Milling Center',
      description: 'How FANA Milling Center handles and protects the personal data of its clients and visitors.',
    },
  },
  cookies: {
    path: '/politica-cookies',
    priority: 0.3,
    changeFrequency: 'yearly',
    es: {
      title: 'Política de cookies | FANA Milling Center',
      description: 'Información sobre las cookies que utiliza el sitio web de FANA Milling Center y cómo gestionarlas.',
    },
    en: {
      title: 'Cookie Policy | FANA Milling Center',
      description: 'Information about the cookies used on the FANA Milling Center website and how to manage them.',
    },
  },
  terms: {
    path: '/terminos-servicio',
    priority: 0.3,
    changeFrequency: 'yearly',
    es: {
      title: 'Términos y condiciones | FANA Milling Center',
      description: 'Condiciones del servicio B2B de FANA Milling Center para clínicas y laboratorios dentales.',
    },
    en: {
      title: 'Terms and Conditions | FANA Milling Center',
      description: 'Terms of the FANA Milling Center B2B service for dental clinics and laboratories.',
    },
  },
};

export const isLocale = (value: string): value is SiteLocale => (LOCALES as readonly string[]).includes(value);

export const pageUrl = (locale: SiteLocale, key: PageKey) => `${SITE_URL}/${locale}${PAGES[key].path}`;

/** Canonical + hreflang alternates for a page. */
export function pageAlternates(locale: SiteLocale, key: PageKey) {
  return {
    canonical: pageUrl(locale, key),
    languages: {
      es: pageUrl('es', key),
      en: pageUrl('en', key),
      'x-default': pageUrl(DEFAULT_LOCALE, key),
    },
  };
}

/** Full metadata (title, description, canonical, hreflang, Open Graph, Twitter) for a page. */
export function pageMetadata(rawLocale: string, key: PageKey): Metadata {
  const locale: SiteLocale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { title, description } = PAGES[key][locale];
  const url = pageUrl(locale, key);

  return {
    title,
    description,
    alternates: pageAlternates(locale, key),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: locale === 'es' ? 'es_US' : 'en_US',
      alternateLocale: locale === 'es' ? ['en_US'] : ['es_US'],
      url,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
