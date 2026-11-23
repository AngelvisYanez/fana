'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PhotoIcon } from '@heroicons/react/24/outline';
import FloatingNav from './FloatingNav';

interface PageHeroProps {
  title: string;
  /** Path to the banner photo. While `null`, an empty dashed container is shown. */
  image: string | null;
  /** Label shown inside the empty container (recommended size). */
  placeholderLabel?: string;
  /** Extra classes for the <Image> (object-position, etc.). */
  imageClassName?: string;
  /** Show the dashed empty container while there is no image. Set to false for plain pages. */
  showPlaceholder?: boolean;
}

/**
 * Compact framed banner shared by the inner pages: floating glass nav on top,
 * centered page title over a darkened photo.
 */
export default function PageHero({
  title,
  image,
  placeholderLabel = 'Imagen hero · 2560 × 1100',
  imageClassName = 'object-center',
  showPlaceholder = true,
}: PageHeroProps) {
  return (
    <section className="bg-white p-2 sm:p-4 lg:p-5 pb-0 sm:pb-0 lg:pb-0">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] lg:rounded-[2.25rem] flex flex-col min-h-[22rem] sm:min-h-[26rem] lg:min-h-[30rem] text-white bg-fana-navy">
        <div className="absolute inset-0 -z-10">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              priority
              quality={85}
              sizes="100vw"
              className={`object-cover ${imageClassName}`}
            />
          ) : showPlaceholder ? (
            <div
              aria-hidden="true"
              className="absolute inset-3 sm:inset-4 rounded-[1.25rem] lg:rounded-[1.75rem] border-2 border-dashed border-white/25 flex items-end justify-end gap-2 p-4 text-white/50"
            >
              <PhotoIcon className="w-5 h-5" />
              <span className="text-xs font-medium">{placeholderLabel}</span>
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(18,93,163,0.55),transparent_60%)]"
            />
          )}
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
            {title}
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
