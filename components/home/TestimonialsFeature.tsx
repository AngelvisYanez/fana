'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import MobileCarousel from '@/components/MobileCarousel';

const KEYS = ['maria', 'carlos', 'ana'] as const;
type Key = (typeof KEYS)[number];

const AVATAR_COLORS: Record<Key, string> = {
  maria: 'bg-[#1a73e8]',
  carlos: 'bg-[#188038]',
  ana: 'bg-[#e37400]',
};

const GoogleG = () => (
  <svg viewBox="0 0 48 48" className="w-5 h-5" aria-label="Google" role="img">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 0 0 0 24c0 3.87.92 7.52 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

const Stars = () => (
  <div className="flex gap-0.5" aria-label="5 / 5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#fbbc04]" aria-hidden="true">
        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))}
  </div>
);

/** Three Google-Reviews-style cards. */
export default function TestimonialsFeature() {
  const t = useTranslations('newDesign.homePage.testimonials');

  return (
    <section className="bg-fana-secondary/50 py-24 sm:py-28 lg:py-36 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal uppercase !leading-[1.2] text-fana-navy">
              {t('title')}
            </h2>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <div className="flex items-center gap-2">
              <GoogleG />
              <span className="font-semibold text-fana-navy">5.0</span>
              <Stars />
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-xs sm:text-right">{t('subtitle')}</p>
          </div>
        </motion.div>

        <MobileCarousel below="md" className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5 lg:gap-6">
          {KEYS.map((k, i) => (
            <motion.figure
              key={k}
              className="group relative overflow-hidden max-md:w-[85%] max-md:shrink-0 max-md:snap-center rounded-3xl bg-white p-6 sm:p-8 flex flex-col gap-5 border border-gray-200/80 shadow-[0_1px_2px_rgba(60,64,67,0.08),0_2px_8px_rgba(60,64,67,0.06)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
            >
              {/* soft quote watermark */}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="absolute -right-2 -bottom-4 w-28 h-28 fill-fana-primary/[0.05]"
              >
                <path d="M9.4 5C5.8 6.4 3 9.8 3 14.2V19h7v-7H6.3c.2-2.4 1.5-4.2 3.8-5.2L9.4 5Zm9 0c-3.6 1.4-6.4 4.8-6.4 9.2V19h7v-7h-3.7c.2-2.4 1.5-4.2 3.8-5.2L18.400 5Z" />
              </svg>

              <figcaption className="relative flex items-center gap-3.5">
                <span
                  className={`relative w-12 h-12 shrink-0 rounded-full flex items-center justify-center font-medium text-white text-lg ring-4 ring-gray-50 shadow-sm ${AVATAR_COLORS[k]}`}
                >
                  {t(`items.${k}.name`).replace(/^(Dra?\.)\s*/, '').charAt(0).toUpperCase()}
                  <span className="absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-white flex items-center justify-center shadow ring-1 ring-gray-100">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-[#1a73e8]" aria-hidden="true">
                      <path d="m9 16.2-3.5-3.5L4 14.1l5 5 11-11-1.4-1.4z" />
                    </svg>
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-[#202124] truncate">{t(`items.${k}.name`)}</p>
                  <p className="text-sm text-gray-500 truncate">{t(`items.${k}.position`)}</p>
                </div>
                <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                  <GoogleG />
                </span>
              </figcaption>

              <div className="relative flex items-center gap-2.5">
                <Stars />
                <span className="h-1 w-1 rounded-full bg-gray-300" />
                <span className="text-sm text-gray-500">Google</span>
              </div>

              <blockquote className="relative text-[#3c4043] leading-relaxed text-[15px] sm:text-base">
                {t(`items.${k}.text`)}
              </blockquote>
            </motion.figure>
          ))}
        </MobileCarousel>
      </div>
    </section>
  );
}
