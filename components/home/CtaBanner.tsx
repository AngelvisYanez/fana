'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

/** Full-bleed photo banner: big left-aligned statement, actions on the right. */
export default function CtaBanner({
  locale,
  image = '/images/about/cta-fit.jpg',
  overlayClassName = 'bg-gradient-to-r from-fana-navy/90 via-fana-navy/55 to-fana-navy/25',
}: {
  locale: string;
  image?: string;
  overlayClassName?: string;
}) {
  const t = useTranslations('newDesign.homePage.cta1');

  return (
    <section className="relative isolate overflow-hidden py-28 sm:py-32 lg:py-40">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover -z-20"
      />
      <div className={`absolute inset-0 -z-10 ${overlayClassName}`} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid lg:grid-cols-12 gap-10 lg:gap-8 lg:items-end"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="lg:col-span-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal uppercase !leading-[1.15] text-white">
              {t('title')}
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-xl">{t('subtitle')}</p>
          </div>
          <div className="lg:col-span-6 flex flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 lg:justify-end">
            <Link
              href={`/${locale}/servicios`}
              className="inline-flex flex-1 sm:flex-none min-w-0 items-center justify-between gap-2 sm:gap-6 sm:whitespace-nowrap rounded-full bg-white text-fana-navy text-sm sm:text-base leading-tight pl-4 sm:pl-7 pr-1.5 sm:pr-2 py-1.5 sm:py-2 font-medium hover:bg-fana-secondary hover:text-fana-navy transition-colors"
            >
              {t('viewServicesButton')}
              <span className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-fana-navy text-white flex items-center justify-center">
                <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </Link>
            <Link
              href={`/${locale}/materiales`}
              className="inline-flex flex-1 sm:flex-none min-w-0 items-center justify-center text-center sm:whitespace-nowrap rounded-full border border-white/60 text-white text-sm sm:text-base leading-tight px-4 sm:px-7 py-3 sm:py-3.5 font-medium hover:bg-white/15 hover:text-white transition-colors"
            >
              {t('requestQuoteButton')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
