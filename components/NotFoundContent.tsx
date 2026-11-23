'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

/** 404 page in the current design: framed banner + floating nav, message and shortcuts. */
export default function NotFoundContent() {
  const t = useTranslations('notFound');
  const nav = useTranslations('navigation');
  const locale = useLocale();

  const links = [
    { href: `/${locale}/nosotros`, label: nav('about') },
    { href: `/${locale}/servicios`, label: nav('services') },
    { href: `/${locale}/materiales`, label: nav('materials') },
    { href: `/${locale}/contacto`, label: nav('contact') },
  ];

  return (
    <div className="min-h-screen">
      <PageHero title="404" image={null} showPlaceholder={false} />

      <section className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl sm:text-5xl font-normal uppercase !leading-[1.15] text-fana-navy">
              {t('title')}
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-600">{t('description')}</p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={`/${locale}`}
                className="group inline-flex items-center gap-4 rounded-full bg-fana-navy text-white text-base font-medium pl-7 pr-2 py-2 hover:bg-fana-primary hover:text-white transition-colors"
              >
                {t('home')}
                <span className="w-11 h-11 rounded-full bg-white text-fana-navy flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRightIcon className="w-5 h-5" />
                </span>
              </Link>
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center rounded-full border border-gray-300 text-fana-navy text-base font-medium px-7 py-3.5 hover:bg-fana-secondary hover:text-fana-navy transition-colors"
              >
                {t('contact')}
              </Link>
            </div>

            <div className="mt-14 border-t border-gray-200 pt-8">
              <p className="text-sm font-semibold text-fana-navy">{t('linksTitle')}</p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-flex rounded-full bg-fana-secondary px-4 py-2 text-sm font-medium text-fana-navy hover:bg-fana-primary hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
