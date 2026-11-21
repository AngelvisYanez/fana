'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRightIcon,
  CircleStackIcon,
  CogIcon,
  PhotoIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface OurServicesSectionProps {
  showCTA?: boolean;
}

/**
 * IMÁGENES — una por servicio, en el mismo orden (1, 2, 3).
 * Pon la ruta (por ejemplo '/images/services/mi-foto.jpg'). Mientras valga `null`
 * se muestra un contenedor vacío con el tamaño recomendado (aprox. 720 × 480 px).
 */
const IMAGES: (string | null)[] = [
  '/images/process/digital-design.jpeg',
  '/images/process/precision-milling.jpeg',
  '/images/services/service-advanced-aesthetics.png', // provisional; cambiar por /images/process/finishing-inspection.jpeg
];

const ICONS = [CircleStackIcon, CogIcon, StarIcon];

/** Interactive selector: numbered serif rows on the left, big image panel on the right. */
export default function OurServicesSection({ showCTA = true }: OurServicesSectionProps) {
  const t = useTranslations('newDesign.services');
  const params = useParams();
  const locale = (params.locale as string) || 'es';
  const [active, setActive] = useState(0);

  const services = [1, 2, 3].map((n, i) => ({
    Icon: ICONS[i],
    title: t(`service${n}.title`),
    description: t(`service${n}.description`),
    image: IMAGES[i],
  }));
  const current = services[active];

  return (
    <section className="bg-gray-50 py-24 sm:py-28 lg:py-36 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="max-w-3xl text-3xl sm:text-5xl lg:text-[3.5rem] font-normal uppercase !leading-[1.15] tracking-normal text-fana-navy">
            {t('title.part1')} <span className="text-fana-primary">{t('title.part2')}</span>
          </h2>
          {showCTA && (
            <Link
              href={`/${locale}/servicios`}
              className="shrink-0 self-start lg:self-auto inline-flex items-center gap-4 rounded-full bg-fana-navy text-white pl-8 pr-2 py-2 font-medium hover:bg-fana-primary transition-colors"
            >
              {t('cta')}
              <span className="w-11 h-11 rounded-full bg-white text-fana-navy flex items-center justify-center">
                <ArrowRightIcon className="w-5 h-5" />
              </span>
            </Link>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 lg:items-stretch">
          {/* Selector */}
          <ul className="lg:col-span-5 border-t border-gray-300 self-start w-full">
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={i} className="border-b border-gray-300">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-pressed={isActive}
                    className="group w-full text-left py-6 sm:py-8 flex items-start gap-5 sm:gap-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-fana-primary rounded-lg"
                  >
                    <span
                      className={`font-heading text-sm pt-2 transition-colors ${
                        isActive ? 'text-fana-primary' : 'text-gray-400'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`block font-heading text-2xl sm:text-3xl !leading-tight transition-colors ${
                          isActive ? 'text-fana-navy' : 'text-gray-400 group-hover:text-gray-600'
                        }`}
                      >
                        {s.title}
                      </span>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            key="desc"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="block overflow-hidden"
                          >
                            <span className="block pt-3 text-sm sm:text-base text-gray-600 leading-relaxed max-w-md">
                              {s.description}
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span
                      className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        isActive ? 'bg-fana-primary text-white' : 'bg-white text-gray-400 border border-gray-300'
                      }`}
                    >
                      <s.Icon className="w-6 h-6" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Image panel */}
          <div className="lg:col-span-7 relative min-h-[20rem] sm:min-h-[28rem] lg:min-h-[32rem] rounded-3xl overflow-hidden bg-fana-navy shadow-[0_30px_60px_-30px_rgba(30,43,79,0.5)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {current.image ? (
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/40 bg-fana-navy text-white/80 pb-16"
                    aria-hidden="true"
                  >
                    <PhotoIcon className="w-12 h-12" />
                    <span className="text-sm font-medium">Imagen · 720 × 480</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>


            {/* Current service chip */}
            <div className="absolute left-5 bottom-5 sm:left-8 sm:bottom-8 flex items-center gap-3 rounded-full bg-white/95 pl-2 pr-5 py-2 text-fana-navy shadow-lg">
              <span className="w-9 h-9 rounded-full bg-fana-primary text-white flex items-center justify-center">
                <current.Icon className="w-5 h-5" />
              </span>
              <span className="font-heading text-sm sm:text-base">{current.title}</span>
            </div>

            {/* Floating stat */}
            <div className="hidden sm:block absolute right-8 bottom-8 rounded-2xl bg-white/95 backdrop-blur px-6 py-4 text-fana-navy shadow-lg">
              <p className="font-heading text-3xl leading-none">{String(active + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}</p>
              <p className="mt-1 text-xs text-gray-600">{t('badge').charAt(0) + t('badge').slice(1).toLowerCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
