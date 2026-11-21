'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const KEYS = ['completedCases', 'deliveryTime', 'customerSatisfaction', 'precision'] as const;

/** Dark band, oversized serif numerals separated by hairlines. */
export default function StatsBand() {
  const t = useTranslations('newDesign.homePage.stats');

  return (
    <section className="bg-fana-navy py-10 sm:py-10 lg:py-12 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-4 gap-y-0">
          {KEYS.map((key, i) => (
            <motion.div
              key={key}
              className={`px-2.5 sm:px-6 lg:px-10 min-w-0 border-white/15 ${i > 0 ? 'border-l' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <dd className="font-heading text-xl sm:text-4xl lg:text-5xl font-normal leading-none text-white">
                {t(`${key}.value`)}
              </dd>
              <dt className="mt-1.5 text-[8px] leading-tight sm:text-xs sm:mt-2 uppercase tracking-[0.06em] sm:tracking-[0.14em] text-blue-200/80">
                {t(`${key}.label`)}
              </dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
