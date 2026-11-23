'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Gauge, Cog, MessageCircle } from 'lucide-react';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import StatsBand from '@/components/home/StatsBand';
import CtaBanner from '@/components/home/CtaBanner';

const VALUES = [
  { id: 'precision', Icon: Gauge },
  { id: 'ownProduction', Icon: Cog },
  { id: 'directContact', Icon: MessageCircle },
] as const;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  const params = useParams();
  const locale = (params.locale as string) || 'es';
  const t = useTranslations('about');

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero: compact framed banner with the floating nav, centered page title */}
        <section className="bg-white p-2 sm:p-4 lg:p-5 pb-0 sm:pb-0 lg:pb-0">
          <div className="relative isolate overflow-hidden rounded-[1.75rem] lg:rounded-[2.25rem] flex flex-col min-h-[22rem] sm:min-h-[26rem] lg:min-h-[30rem] text-white bg-fana-navy">
            <div className="absolute inset-0 -z-10">
              <Image
                src="/images/about/about-hero.jpg"
                alt={t('page.hero.imageAlt')}
                fill
                priority
                quality={85}
                sizes="100vw"
                className="object-cover object-[72%_50%]"
              />
              <div className="absolute inset-0 bg-fana-navy/55" />
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-fana-navy/70 to-transparent" />
            </div>

            <FloatingNav />

            <div className="flex-1 flex items-center justify-center px-4 pb-14 sm:pb-16 lg:pb-20 text-center">
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-semibold uppercase tracking-tight text-white"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {t('page.hero.title')}
              </motion.h1>
            </div>
          </div>
        </section>

        {/* Principles: soft rounded panel, statement + three cards */}
        <section className="bg-white p-2 sm:p-4 lg:p-5">
          <div className="rounded-[1.75rem] lg:rounded-[2.25rem] bg-gray-50 px-4 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <motion.div {...reveal}>
              <p className="max-w-3xl text-2xl sm:text-3xl lg:text-4xl font-medium leading-snug text-fana-navy">
                {t('page.intro.lead')}{' '}
                <span className="text-gray-400">{t('page.intro.muted')}</span>
              </p>
            </motion.div>

            <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {VALUES.map(({ id, Icon }, i) => (
                <motion.div
                  key={id}
                  className="flex min-h-[15rem] flex-col justify-between rounded-3xl bg-white p-6 sm:p-7"
                  initial={reveal.initial}
                  whileInView={reveal.whileInView}
                  viewport={reveal.viewport}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-fana-navy text-white">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div className="mt-10">
                    <h3 className="text-xl font-semibold text-fana-navy">
                      {t(`page.values.items.${id}.title`)}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-gray-500 max-w-xs">
                      {t(`page.values.items.${id}.text`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <StatsBand />

        {/* History */}
        <section className="bg-white py-20 sm:py-24 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 lg:items-stretch">
              <motion.div {...reveal} className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[28rem] overflow-hidden rounded-3xl bg-fana-secondary">
                  <Image
                    src="/images/services/Historia.jpg"
                    alt={t('page.history.imageAlt')}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </motion.div>

              <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
                <SectionHeading
                  align="left"
                  title={t('history.title')}
                />
                <motion.div
                  {...reveal}
                  className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-gray-600 max-w-2xl"
                >
                  <p>{t('history.paragraph1')}</p>
                  <p>{t('history.paragraph2')}</p>
                  <p>{t('history.paragraph3')}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <CtaBanner locale={locale} />
        <Footer />
      </div>
    </PageTransition>
  );
}
