'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';

const CARDS = [
  { id: 'precision', image: '/images/about/about-precision.png' },
  { id: 'machines', image: '/images/materials/equipment-5axis-cnc.png' },
] as const;

const STATS = ['satisfaction', 'delivery', 'precision'] as const;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

export default function AboutShowcase() {
  const t = useTranslations('newDesign.aboutShowcase');
  const params = useParams();
  const locale = (params.locale as string) || 'es';
  const href = `/${locale}/nosotros`;

  return (
    <section className="bg-white pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-28 lg:pb-36 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: image + stats */}
          <div className="lg:col-span-6 flex flex-col gap-10 lg:gap-10">
            <motion.div
              {...reveal}
              className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[5/4] overflow-hidden rounded-3xl bg-fana-secondary"
            >
              {/* object-position pushes the source watermark (bottom-right) out of frame */}
              <Image
                src="/images/about/about-laboratory.png"
                alt={t('labAlt')}
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover object-[30%_20%] scale-[1.12] origin-top-left"
              />
            </motion.div>

            <motion.dl {...reveal} className="grid grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div key={s} className="min-w-0">
                  <dt className="sr-only">{t(`stats.${s}.label`)}</dt>
                  <dd className="text-2xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-fana-navy break-words">
                    {t(`stats.${s}.value`)}
                  </dd>
                  <p className="mt-1 text-[0.65rem] sm:text-xs uppercase tracking-wide text-gray-500" aria-hidden="true">
                    {t(`stats.${s}.label`)}
                  </p>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Right: text + cards */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-10 lg:gap-10">
            <motion.div {...reveal}>
              <h2 className="text-3xl sm:text-5xl lg:text-[3rem] font-normal uppercase !leading-[1.2] tracking-normal text-fana-navy">
                <span className="block mb-4 text-xs sm:text-sm font-medium normal-case tracking-normal text-gray-500">
                  {t('label')}
                </span>
                {t('title')}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-600 max-w-md">{t('description')}</p>
              <Link
                href={href}
                className="mt-6 inline-flex items-center gap-1 pl-5 pr-1 py-1 rounded-full border border-gray-200 text-sm font-medium text-fana-navy hover:bg-fana-secondary transition-colors group"
              >
                {t('cta')}
                <span className="w-9 h-9 rounded-full bg-fana-navy text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {CARDS.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={reveal.initial}
                  whileInView={reveal.whileInView}
                  viewport={reveal.viewport}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={href}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-fana-navy"
                  >
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 24vw, 46vw"
                      className="object-cover object-[40%_30%] scale-[1.1] origin-top-left transition-transform duration-700 group-hover:scale-[1.18]"
                    />
                    <div className="absolute inset-0 bg-fana-navy/40" />
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 flex items-end justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-base sm:text-xl font-medium leading-tight text-white">
                          {t(`cards.${c.id}.title`)}
                        </p>
                        <p className="text-xs sm:text-sm text-white/70">{t(`cards.${c.id}.subtitle`)}</p>
                      </div>
                      <span className="hidden sm:flex w-8 h-8 shrink-0 rounded-full bg-white/25 backdrop-blur-md text-white items-center justify-center group-hover:bg-white group-hover:text-fana-navy transition-colors">
                        <ArrowUpRightIcon className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
