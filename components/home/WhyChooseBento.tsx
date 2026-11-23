'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Cpu, Gem, Headset, ShieldCheck, Target, Timer } from 'lucide-react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import MobileCarousel from '@/components/MobileCarousel';

/**
 * IMÁGENES — pon aquí la ruta de la imagen (por ejemplo '/images/services/mi-foto.jpg').
 * Mientras valga `null` se muestra un contenedor vacío (aprox. 500 × 300 px, horizontal).
 */
const IMAGES = {
  materials: '/images/why/premium-materials.jpeg' as string | null,
};

type Theme = 'navy' | 'primary' | 'white' | 'soft' | 'deep';

const THEMES: Record<Theme, { card: string; title: string; text: string; icon: string }> = {
  navy: {
    card: 'bg-fana-navy',
    title: 'text-white',
    text: 'text-blue-100',
    icon: 'bg-white/10 text-white',
  },
  primary: {
    card: 'bg-fana-primary',
    title: 'text-white',
    text: 'text-blue-50',
    icon: 'bg-white/15 text-white',
  },
  deep: {
    card: 'bg-fana-navy',
    title: 'text-white',
    text: 'text-blue-100',
    icon: 'bg-white/15 text-white',
  },
  white: {
    card: 'bg-white border border-gray-200',
    title: 'text-fana-navy',
    text: 'text-gray-600',
    icon: 'bg-fana-secondary text-fana-primary',
  },
  soft: {
    card: 'bg-fana-secondary border border-fana-secondary',
    title: 'text-fana-navy',
    text: 'text-gray-600',
    icon: 'bg-white text-fana-primary',
  },
};

interface TileProps {
  theme: Theme;
  /** grid placement (spans on small screens + explicit position from lg up) */
  place: string;
  delay?: number;
  className?: string;
  children: ReactNode;
}

/** Card shell shared by all 7 tiles. */
function Tile({ theme, place, delay = 0, className = '', children }: TileProps) {
  const th = THEMES[theme];
  return (
    <motion.article
      className={`group relative isolate overflow-hidden max-sm:w-[82%] max-sm:shrink-0 max-sm:snap-center rounded-3xl cursor-default transition-shadow duration-300 ease-out hover:shadow-[0_24px_48px_-28px_rgba(30,43,79,0.4)] ${th.card} ${place} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.article>
  );
}

interface FeatureProps {
  theme: Theme;
  Icon: typeof Target;
  title: string;
  text: string;
  /** title / text size */
  size?: 'sm' | 'md' | 'lg';
}

/** Simple content: icon on top, title + description at the bottom. */
function Feature({ theme, Icon, title, text, size = 'md' }: FeatureProps) {
  const th = THEMES[theme];
  const titleSize = size === 'lg' ? 'text-3xl sm:text-4xl' : size === 'sm' ? 'text-lg' : 'text-xl sm:text-2xl';
  const textSize = size === 'lg' ? 'text-base sm:text-lg max-w-sm' : 'text-sm max-w-md';
  return (
    <div className={`relative z-10 h-full flex flex-col justify-between gap-4 ${size === 'sm' ? 'p-5' : 'p-6 sm:p-7'}`}>
      <span
        className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center ${th.icon}`}
      >
        <Icon className="w-6 h-6" strokeWidth={1.75} />
      </span>
      <div>
        <h3 className={`font-heading ${th.title} ${titleSize}`}>
          {title}
        </h3>
        <p className={`mt-2 leading-relaxed ${th.text} ${textSize} ${size === 'sm' ? 'line-clamp-3' : ''}`}>{text}</p>
      </div>
    </div>
  );
}

/** 7-card bento mosaic (positional layout), calm hover (soft shadow only). */
export default function WhyChooseBento() {
  const t = useTranslations('newDesign.homePage.whyChooseUs');

  const f = (k: string) => ({ title: t(`features.${k}.title`), text: t(`features.${k}.description`) });

  return (
    <section className="bg-white py-24 sm:py-28 lg:py-36 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid lg:grid-cols-12 gap-6 lg:gap-10 lg:items-end mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-normal uppercase !leading-[1.15] tracking-normal text-fana-navy">
              {t('title')}
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-base sm:text-lg text-gray-600">{t('subtitle')}</p>
        </motion.div>

        <MobileCarousel className="sm:grid sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[repeat(6,6.75rem)] sm:gap-4">
          {/* 1 · small, top-left */}
          <Tile
            theme="navy"
            place="lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2"
            className="min-h-[12rem] lg:min-h-0"
          >
            <Feature theme="navy" Icon={Timer} size="sm" {...f('delivery')} />
          </Tile>

          {/* 5 · centre */}
          <Tile
            theme="primary"
            place="lg:col-start-5 lg:col-span-3 lg:row-start-3 lg:row-span-2"
            delay={0.15}
            className="min-h-[12rem] lg:min-h-0"
          >
            <Feature theme="primary" Icon={ShieldCheck} size="sm" {...f('quality')} />
          </Tile>

          {/* 2 · wide, top-centre */}
          <Tile
            theme="white"
            place="sm:col-span-2 lg:col-start-3 lg:col-span-5 lg:row-start-1 lg:row-span-2"
            delay={0.05}
            className="min-h-[12rem] lg:min-h-0"
          >
            <Feature theme="white" Icon={Cpu} {...f('technology')} />
          </Tile>

          {/* 3 · tall image, top-right */}
          <Tile
            theme="soft"
            place="lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-3"
            delay={0.1}
            className="min-h-[18rem] lg:min-h-0"
          >
            {IMAGES.materials ? (
              <Image
                src={IMAGES.materials}
                alt={t('features.materials.title')}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            ) : (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-fana-primary/40 text-fana-primary pb-20"
                aria-hidden="true"
              >
                <PhotoIcon className="w-12 h-12" />
                <span className="text-sm font-medium">Imagen · 500 × 300</span>
              </div>
            )}
            <div className="absolute inset-x-4 bottom-4 z-10 rounded-2xl bg-white/90 backdrop-blur p-4 flex items-start gap-3">
              <span className="shrink-0 w-10 h-10 rounded-xl bg-fana-primary text-white flex items-center justify-center">
                <Gem className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-heading text-base text-fana-navy">{t('features.materials.title')}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-snug">{t('features.materials.description')}</p>
              </div>
            </div>
          </Tile>

          {/* 6 · centre-bottom: the extra stat card */}
          <Tile
            theme="white"
            place="lg:col-start-5 lg:col-span-3 lg:row-start-5 lg:row-span-2"
            delay={0.2}
            className="min-h-[10rem] lg:min-h-0 flex flex-col items-center justify-center text-center"
          >
            <p className="relative z-10 font-heading text-5xl text-fana-primary leading-none">
              {t('seal.value')}
            </p>
            <p className="relative z-10 mt-2 text-sm text-gray-500">{t('seal.label')}</p>
          </Tile>

          {/* 4 · tall, left */}
          <Tile
            theme="soft"
            place="sm:col-span-2 lg:col-start-1 lg:col-span-4 lg:row-start-3 lg:row-span-4"
            delay={0.1}
            className="min-h-[18rem] lg:min-h-0"
          >
            <Feature theme="soft" Icon={Target} size="lg" {...f('precision')} />
          </Tile>

          {/* 7 · bottom-right */}
          <Tile
            theme="deep"
            place="sm:col-span-2 lg:col-start-8 lg:col-span-5 lg:row-start-4 lg:row-span-3"
            delay={0.25}
            className="min-h-[14rem] lg:min-h-0"
          >
            <Feature theme="deep" Icon={Headset} {...f('support')} />
          </Tile>
        </MobileCarousel>
      </div>
    </section>
  );
}
