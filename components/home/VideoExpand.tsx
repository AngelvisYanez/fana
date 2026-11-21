'use client';

import { useTranslations } from 'next-intl';
import ScrollExpand from '@/components/ScrollExpand';

/** Scroll-driven expanding video frame, shown right after "Sobre FANA". */
export default function VideoExpand() {
  const t = useTranslations('newDesign.homePage.videoExpand');

  return (
    <section className="relative -mt-[32svh] sm:mt-0 pointer-events-none sm:pointer-events-auto sm:bg-white">
      <ScrollExpand
        src="/images/hero/hero-video.mp4"
        mediaType="video"
        title={t('title')}
        scrollHint={t('scrollHint')}
        mobileStartWidth={88}
        mobileStartHeight={34}
        useWindowScroll
        scrollDistance={0.6}
        holdDistance={0.1}
        smoothing={0.06}
        overlayScrim={0.6}
      >
        <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-normal !leading-[1.15] text-white max-w-4xl">
          {t('heading')}
        </h2>
        <p className="mt-5 text-base sm:text-xl text-white/85 max-w-2xl">{t('text')}</p>
      </ScrollExpand>
    </section>
  );
}
