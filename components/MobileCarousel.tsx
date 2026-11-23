'use client';

import { Children, useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type Breakpoint = 'sm' | 'md';

/** Static class strings so Tailwind can see them. */
const BP = {
  sm: {
    track: 'max-sm:flex max-sm:overflow-x-auto max-sm:overflow-y-hidden max-sm:snap-x max-sm:snap-mandatory max-sm:gap-4 max-sm:-mx-4 max-sm:px-4 max-sm:scroll-px-4 max-sm:pb-1',
    dots: 'sm:hidden',
  },
  md: {
    track: 'max-md:flex max-md:overflow-x-auto max-md:overflow-y-hidden max-md:snap-x max-md:snap-mandatory max-md:gap-4 max-md:-mx-4 max-md:px-4 max-md:scroll-px-4 max-md:pb-1',
    dots: 'md:hidden',
  },
} as const;

interface MobileCarouselProps {
  /** Layout classes used from the breakpoint upwards (e.g. "sm:grid sm:grid-cols-2"). Do not use an unprefixed `display`. */
  className?: string;
  /** Below this breakpoint the children become a swipeable carousel. */
  below?: Breakpoint;
  children: ReactNode;
}

/**
 * Below the breakpoint: horizontal scroll-snap carousel with dot indicators.
 * Children must set their own width + `snap-center shrink-0` for the carousel (e.g. `max-sm:w-[82%] max-sm:shrink-0 max-sm:snap-center`).
 */
export default function MobileCarousel({ className = '', below = 'sm', children }: MobileCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);
  const bp = BP[below];

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || count < 2) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    setActive(Math.round((el.scrollLeft / max) * (count - 1)));
  }, [count]);

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  const goTo = (i: number) => {
    const el = trackRef.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (!el || !child) return;
    el.scrollTo({ left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2, behavior: 'smooth' });
  };

  return (
    <>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className={`${bp.track} [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${className}`}
      >
        {children}
      </div>
      <div className={`${bp.dots} mt-5 flex justify-center gap-2`} role="tablist" aria-hidden={count < 2}>
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`${i + 1} / ${count}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? 'w-6 bg-fana-navy' : 'w-2 bg-fana-navy/25'
            }`}
          />
        ))}
      </div>
    </>
  );
}
