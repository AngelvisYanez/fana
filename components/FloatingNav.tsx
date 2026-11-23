'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LanguageSwitcher from './LanguageSwitcher';
import { QuoteModal } from './HeroSection';

/**
 * Same floating glass nav as the home hero (logo, pill links, language, quote CTA,
 * mobile drawer). Meant to sit on top of a dark photo inside a rounded hero panel.
 */
export default function FloatingNav() {
  const t = useTranslations('newDesign.heroV2');
  const nav = useTranslations('navigation');
  const locale = useLocale();

  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const navItems = [
    { href: `/${locale}`, label: nav('home') },
    { href: `/${locale}/nosotros`, label: nav('about') },
    { href: `/${locale}/servicios`, label: nav('services') },
    { href: `/${locale}/materiales`, label: nav('materials') },
    { href: `/${locale}/contacto`, label: nav('contact') },
  ];

  return (
    <>
      <header className="relative z-30 flex items-center justify-between gap-3 p-3 sm:p-5 lg:p-6">
        <Link href={`/${locale}`} className="relative block h-12 w-36 sm:h-16 sm:w-48 lg:h-20 lg:w-60 shrink-0">
          <Image
            src="/images/logo/logo-fana-2.png"
            alt="FANA Milling Center"
            fill
            priority
            className="object-contain object-left"
            sizes="240px"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-2 py-1.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-full text-sm font-medium text-white/90 hover:bg-white/20 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block rounded-full bg-white [&>div>button]:border-0 [&>div>button]:rounded-full">
            <LanguageSwitcher currentLocale={locale} />
          </div>
          <button
            onClick={() => setQuoteOpen(true)}
            className="hidden sm:flex items-center gap-1 pl-5 pr-1 py-1 rounded-full bg-white text-fana-navy text-sm font-bold uppercase tracking-wide group"
          >
            {t('cta')}
            <span className="w-9 h-9 rounded-full bg-fana-navy text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <ArrowRightIcon className="w-4 h-4" />
            </span>
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? t('menuClose') : t('menuOpen')}
            aria-expanded={menuOpen}
            className="lg:hidden w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white"
          >
            {menuOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <>
                <motion.div
                  key="menu-backdrop"
                  className="lg:hidden fixed inset-0 z-[9100] bg-fana-navy/40 backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMenuOpen(false)}
                />
                <motion.aside
                  key="menu-drawer"
                  role="dialog"
                  aria-modal="true"
                  aria-label={t('menuOpen')}
                  className="lg:hidden fixed inset-y-2 right-2 z-[9200] w-[88vw] max-w-md flex flex-col rounded-[1.75rem] bg-fana-navy/45 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.45)] text-white p-5 overflow-y-auto"
                  initial={{ x: '110%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '110%' }}
                  transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.4 }}
                >
                  <div className="flex justify-end">
                    <button
                      onClick={() => setMenuOpen(false)}
                      aria-label={t('menuClose')}
                      className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <ul className="flex flex-col mt-6">
                    {navItems.map((item, i) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.05, duration: 0.35 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="block py-4 text-2xl font-medium !text-white border-b border-white/10 hover:!text-white/70 transition-colors"
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6 flex items-center gap-3">
                    <div className="rounded-full bg-white [&>div>button]:border-0 [&>div>button]:rounded-full">
                      <LanguageSwitcher currentLocale={locale} dropUp />
                    </div>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setQuoteOpen(true);
                      }}
                      className="flex-1 py-3.5 rounded-full bg-white text-fana-navy text-sm font-bold uppercase tracking-wide"
                    >
                      {t('cta')}
                    </button>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}

      <AnimatePresence>{quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}</AnimatePresence>
    </>
  );
}
