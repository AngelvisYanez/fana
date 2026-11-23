'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import PageHero from '@/components/PageHero';
import ContactSplit from '@/components/home/ContactSplit';

/**
 * IMÁGENES — pon aquí la ruta (por ejemplo '/images/materials/zirconia.jpg').
 * Mientras valga `null` se muestra un contenedor vacío con el tamaño recomendado.
 */
const IMAGES = {
  hero: '/images/materials/materials-hero.jpg' as string | null, // banner superior · 2560 × 1100 (21:9)
  zirconia: '/images/materials/material-zirconia.jpg' as string | null, // tarjeta · 1200 × 900 (4:3)
  lithium: '/images/materials/material-lithium.jpg' as string | null, // tarjeta · 1200 × 900 (4:3)
  pmma: '/images/materials/material-pmma.jpg' as string | null, // tarjeta · 1200 × 900 (4:3)
  wax: '/images/materials/material-wax.jpg' as string | null, // tarjeta · 1200 × 900 (4:3)
  technology: '/images/materials/materials-technology.jpg' as string | null, // sección tecnología · 1200 × 1500 (4:5)
};

const MATERIALS = ['zirconia', 'lithium', 'pmma', 'wax'] as const;
const SPECS = [1, 2, 3, 4] as const;
const TECH = ['fiveAxis', 'scanners', 'software'] as const;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

function ImageBox({
  src,
  alt,
  label,
  className,
  sizes,
}: {
  src: string | null;
  alt: string;
  label: string;
  className: string;
  sizes: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-fana-secondary ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-fana-primary/40 text-fana-primary/70"
        >
          <PhotoIcon className="w-10 h-10" />
          <span className="text-sm font-medium">{label}</span>
        </div>
      )}
    </div>
  );
}

export default function MaterialesPage() {
  const params = useParams();
  const locale = (params.locale as string) || 'es';
  const t = useTranslations('newDesign.materialsPage');
  const nav = useTranslations('navigation');

  return (
    <PageTransition>
      <div className="min-h-screen">
        <PageHero
          title={nav('materials')}
          image={IMAGES.hero}
          imageClassName="object-[75%_50%] sm:object-center"
        />

        {/* Intro: centered statement */}
        <section className="bg-white pt-16 sm:pt-20 lg:pt-28 pb-6 sm:pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal uppercase !leading-[1.15] text-fana-navy">
                {t('intro.title')}
              </h2>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-600">
                {t('intro.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Materials: photo on top, specs as hairline rows */}
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {MATERIALS.map((m, i) => (
                <motion.article
                  key={m}
                  className="overflow-hidden rounded-3xl bg-gray-50"
                  initial={reveal.initial}
                  whileInView={reveal.whileInView}
                  viewport={reveal.viewport}
                  transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
                >
                  <ImageBox
                    src={IMAGES[m]}
                    alt={t(`items.${m}.imageAlt`)}
                    label="Imagen · 1200 × 900"
                    sizes="(min-width: 768px) 48vw, 100vw"
                    className="aspect-[4/3]"
                  />
                  <div className="p-6 sm:p-8">
                    <h3 className="font-heading text-2xl sm:text-3xl text-fana-navy">
                      {t(`items.${m}.title`)}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-gray-600 max-w-md">
                      {t(`items.${m}.description`)}
                    </p>
                    <ul className="mt-6 divide-y divide-gray-200 border-t border-gray-200">
                      {SPECS.map((n) => (
                        <li key={n} className="flex items-center gap-3 py-3 text-sm sm:text-base text-fana-navy">
                          <span className="flex w-5 h-5 shrink-0 items-center justify-center rounded-full bg-fana-primary text-white">
                            <CheckIcon className="w-3 h-3" strokeWidth={3} />
                          </span>
                          {t(`items.${m}.spec${n}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Technology: framed navy panel, photo + metrics */}
        <section className="bg-white p-2 sm:p-4 lg:p-5">
          <div className="rounded-[1.75rem] lg:rounded-[2.25rem] bg-fana-navy text-white px-4 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 lg:items-stretch">
              <motion.div {...reveal} className="lg:col-span-5">
                <ImageBox
                  src={IMAGES.technology}
                  alt={t('technology.imageAlt')}
                  label="Imagen · 1200 × 1500"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[30rem] rounded-3xl !bg-white/10"
                />
              </motion.div>

              <motion.div {...reveal} className="lg:col-span-7 flex flex-col justify-center">
                <h2 className="text-3xl sm:text-5xl font-normal uppercase !leading-[1.15] text-white">
                  {t('technology.title')}
                </h2>
                <p className="mt-6 max-w-xl text-base sm:text-lg text-blue-100">
                  {t('technology.description')}
                </p>

                <ul className="mt-10 divide-y divide-white/15 border-y border-white/15">
                  {TECH.map((k) => (
                    <li key={k} className="flex items-center justify-between gap-6 py-5 sm:py-6">
                      <div className="min-w-0">
                        <p className="font-heading text-lg sm:text-xl text-white">{t(`technology.${k}.title`)}</p>
                        <p className="mt-1 text-sm text-blue-200">{t(`technology.${k}.text`)}</p>
                      </div>
                      <span className="font-heading text-3xl sm:text-5xl text-white shrink-0">
                        {t(`technology.${k}.metric`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <ContactSplit locale={locale} />
        <Footer />
      </div>
    </PageTransition>
  );
}
