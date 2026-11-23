'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CubeIcon, PhotoIcon, StarIcon } from '@heroicons/react/24/outline';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import OurServicesSection from '@/components/OurServicesSection';
import CtaBanner from '@/components/home/CtaBanner';

/**
 * IMÁGENES — pon aquí la ruta (por ejemplo '/images/services/services-hero.jpg').
 * Mientras valga `null` se muestra un contenedor vacío con el tamaño recomendado.
 */
const IMAGES = {
  hero: '/images/services/services-hero.jpg' as string | null, // banner superior · 2560 × 1100 (21:9)
  structures: '/images/services/services-Structure Milling.jpg' as string | null, // 4:5 vertical
  aesthetics: '/images/services/services-Advanced Aesthetics.jpg' as string | null, // 4:5 vertical
};

const SERVICES = [
  {
    key: 'millingStructures',
    Icon: CubeIcon,
    image: IMAGES.structures,
    stats: ['precision', 'delivery'],
    listTitle: 'materialsTitle',
    list: ['materials.zirconia', 'materials.titanium', 'materials.chromeCobalt', 'materials.pmma'],
  },
  {
    key: 'advancedAesthetics',
    Icon: StarIcon,
    image: IMAGES.aesthetics,
    stats: ['colorSystem', 'biocompatible'],
    listTitle: 'restorationsTitle',
    list: [
      'restorations.crowns',
      'restorations.bridges',
      'restorations.veneers',
      'restorations.inlaysOnlays',
    ],
  },
] as const;

const OFFERED = ['implantStructures', 'crownsAndBridges', 'advancedAesthetics', 'provisionalRestorations'] as const;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

export default function ServiciosPage() {
  const params = useParams();
  const locale = (params.locale as string) || 'es';
  const t = useTranslations('newDesign.servicesPage');
  const tq = useTranslations('newDesign.hero');
  const nav = useTranslations('navigation');

  return (
    <PageTransition>
      <div className="min-h-screen">
        <PageHero
          title={nav('services')}
          image={IMAGES.hero}
          imageClassName="object-[80%_50%] sm:object-center"
        />

        {/* Intro: heading left, description + service chips right */}
        <section className="bg-white pt-16 sm:pt-20 lg:pt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 lg:items-end border-b border-fana-navy/15 pb-14 sm:pb-16 lg:pb-20">
              <motion.div {...reveal} className="lg:col-span-7">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal uppercase !leading-[1.15] text-fana-navy">
                  {t('hero.title')}
                </h2>
              </motion.div>

              <motion.div {...reveal} className="lg:col-span-5">
                <p className="text-base sm:text-lg leading-relaxed text-gray-600">{t('hero.description')}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {OFFERED.map((key) => (
                    <li
                      key={key}
                      className="inline-flex items-center gap-2 rounded-full bg-fana-secondary px-4 py-2 text-sm font-medium text-fana-navy"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-fana-primary" aria-hidden="true" />
                      {tq(`form.services.${key}`)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Detailed services: image + copy, alternating */}
        <section className="bg-white pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 lg:pb-32 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28 lg:space-y-36">
            {SERVICES.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <div
                  key={s.key}
                  className="grid lg:grid-cols-12 gap-10 lg:gap-16 lg:items-stretch"
                >
                  {/* Image */}
                  <motion.div
                    {...reveal}
                    className={`lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}
                  >
                    <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[32rem] overflow-hidden rounded-3xl bg-fana-secondary">
                      {s.image ? (
                        <Image
                          src={s.image}
                          alt={t(`${s.key}.imageAlt`)}
                          fill
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="object-cover"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-fana-primary/40 text-fana-primary/70"
                        >
                          <PhotoIcon className="w-12 h-12" />
                          <span className="text-sm font-medium">Imagen · 1200 × 1500</span>
                        </div>
                      )}
                      <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 flex items-center gap-3 rounded-full bg-white/95 pl-2 pr-5 py-2 text-fana-navy shadow-lg">
                        <span className="w-9 h-9 shrink-0 rounded-full bg-fana-primary text-white flex items-center justify-center">
                          <s.Icon className="w-5 h-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-heading text-sm sm:text-base leading-tight">
                            {t(`${s.key}.imageAlt`)}
                          </span>
                          <span className="block text-xs text-gray-500">{t(`${s.key}.imageSubtitle`)}</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Copy */}
                  <motion.div
                    {...reveal}
                    className={`lg:col-span-7 flex flex-col justify-center ${flip ? 'lg:order-1' : ''}`}
                  >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal uppercase !leading-[1.2] text-fana-navy">
                      {t(`${s.key}.title`)}
                    </h2>
                    <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-gray-600">
                      {t(`${s.key}.description`)}
                    </p>

                    <dl className="mt-8 grid grid-cols-2 max-w-md">
                      {s.stats.map((stat, n) => (
                        <div
                          key={stat}
                          className={`min-w-0 ${n > 0 ? 'border-l border-fana-navy/15 pl-5 sm:pl-8' : 'pr-5 sm:pr-8'}`}
                        >
                          <dd className="font-heading text-3xl sm:text-4xl text-fana-navy leading-none">
                            {t(`${s.key}.${stat}.value`)}
                          </dd>
                          <dt className="mt-2 text-xs sm:text-sm text-gray-500">
                            {t(`${s.key}.${stat}.label`)}
                          </dt>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-8">
                      <h3 className="text-sm font-semibold text-fana-navy">
                        {t(`${s.key}.${s.listTitle}`).replace(/:\s*$/, '')}
                      </h3>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {s.list.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-gray-300 px-4 py-2 text-sm text-fana-navy"
                          >
                            {t(`${s.key}.${item}`)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>

        <OurServicesSection showCTA={false} />

        <CtaBanner locale={locale} />
        <Footer />
      </div>
    </PageTransition>
  );
}
