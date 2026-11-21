'use client';

import { useRef } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
  CubeIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const ITEMS = [
  { id: 'structures', image: '/images/services/service-implant-structures.png' },
  { id: 'aesthetics', image: '/images/services/service-advanced-aesthetics.png' },
  { id: 'milling', image: '/images/services/service-general-milling.png' },
  { id: 'supplies', image: '/images/materials/equipment-5axis-cnc.png' },
] as const;

const AVATARS = [
  { Icon: CogIcon, bg: 'bg-fana-navy' },
  { Icon: CubeIcon, bg: 'bg-fana-primary' },
  { Icon: SparklesIcon, bg: 'bg-sky-500' },
];

export default function ServicesShowcase() {
  const t = useTranslations('newDesign.servicesShowcase');
  const params = useParams();
  const locale = (params.locale as string) || 'es';
  const scroller = useRef<HTMLUListElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="bg-white pt-24 pb-24 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="grid lg:grid-cols-12 gap-5 lg:gap-8 lg:items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="lg:col-span-7 lg:col-start-2 text-3xl sm:text-5xl lg:text-[3.5rem] font-normal uppercase !leading-[1.2] tracking-normal text-fana-navy">
            <span className="block lg:inline mb-2 lg:mb-0 lg:mr-3 text-xs sm:text-sm font-medium normal-case tracking-normal text-gray-500 align-top">
              {t('label')}
            </span>
            {t('title')}
          </h2>
          <p className="lg:col-span-4 text-base text-gray-600 max-w-md">{t('description')}</p>
        </motion.div>

        {/* Body */}
        <div className="mt-10 sm:mt-12 lg:mt-16 grid lg:grid-cols-12 gap-8 lg:gap-6 lg:items-stretch">
          {/* Trust block */}
          <div className="lg:col-span-3 flex lg:flex-col lg:justify-between gap-6 lg:py-2">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3" aria-hidden="true">
                {AVATARS.map(({ Icon, bg }, i) => (
                  <span
                    key={i}
                    className={`w-11 h-11 rounded-full ${bg} text-white ring-2 ring-white flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                ))}
              </div>
              <div className="leading-tight">
                <p className="text-xl font-semibold text-fana-navy">{t('trustValue')}</p>
                <p className="text-xs text-gray-500">{t('trustLabel')}</p>
              </div>
            </div>
            <p className="hidden lg:block text-xs text-gray-500 max-w-[14rem]">{t('trustText')}</p>
          </div>

          {/* Carousel */}
          <div className="lg:col-span-9 relative">
            <ul
              ref={scroller}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {ITEMS.map((item, i) => (
                <motion.li
                  key={item.id}
                  className="snap-start shrink-0 basis-[72%] sm:basis-[calc((100%-2rem)/3)]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link
                    href={`/${locale}/servicios`}
                    aria-label={`${t('viewService')}: ${t(`items.${item.id}`)}`}
                    className="group relative block aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-3xl bg-fana-navy"
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 28vw, (min-width: 640px) 30vw, 72vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-fana-navy/40" />
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between gap-3">
                      <h3 className="text-xl sm:text-2xl font-medium leading-tight text-white">
                        {t(`items.${item.id}`)}
                      </h3>
                      <span className="w-9 h-9 shrink-0 rounded-full bg-white/25 backdrop-blur-md text-white flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-fana-navy">
                        <ArrowUpRightIcon className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Arrows */}
            <div className="mt-5 flex items-center justify-end gap-2 lg:absolute lg:-left-14 lg:bottom-6 lg:mt-0 lg:flex-col lg:justify-end">
              <button
                onClick={() => scrollByCard(-1)}
                aria-label={t('prev')}
                className="w-11 h-11 rounded-full bg-fana-navy text-white flex items-center justify-center hover:bg-fana-primary transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollByCard(1)}
                aria-label={t('next')}
                className="w-11 h-11 rounded-full bg-white text-fana-navy border border-gray-200 flex items-center justify-center hover:bg-fana-secondary transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <p className="lg:hidden mt-6 text-xs text-gray-500">{t('trustText')}</p>
      </div>
    </section>
  );
}
