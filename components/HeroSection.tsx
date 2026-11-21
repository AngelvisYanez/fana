'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRightIcon,
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import LanguageSwitcher from './LanguageSwitcher';

const SLIDES = [
  { id: 'structures', image: '/images/services/service-implant-structures.png' },
  { id: 'aesthetics', image: '/images/services/service-advanced-aesthetics.png' },
  { id: 'milling', image: '/images/services/service-general-milling.png' },
  { id: 'supplies', image: '/images/materials/equipment-5axis-cnc.png' },
] as const;

const AUTOPLAY_MS = 6000;

const QUOTE_SERVICES = [
  { id: 'estructuras', key: 'implantStructures' },
  { id: 'coronas', key: 'crownsAndBridges' },
  { id: 'estetica', key: 'advancedAesthetics' },
  { id: 'provisional', key: 'provisionalRestorations' },
] as const;

const inputClass =
  'w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-fana-primary focus:border-transparent outline-none text-gray-700 placeholder-gray-500';

function QuoteModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations('newDesign.hero');
  const th = useTranslations('newDesign.heroV2');
  const [formData, setFormData] = useState({ fullName: '', phone: '', email: '', services: [] as string[] });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const toggleService = (id: string) =>
    setFormData((p) => ({
      ...p,
      services: p.services.includes(id) ? p.services.filter((s) => s !== id) : [...p.services, id],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });
    if (formData.services.length === 0) {
      setStatus({ type: 'error', message: t('form.error.serviceRequired') });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`${window.location.origin}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: '',
          message: `Solicitud de cotización desde el formulario principal para los siguientes servicios: ${formData.services.join(', ')}`,
          service: formData.services.join(', '),
        }),
      });
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(t('form.error.server'));
      }
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || t('form.error.send'));
      setStatus({ type: 'success', message: data.message || t('form.successMessage') });
      setFormData({ fullName: '', phone: '', email: '', services: [] });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : t('form.error.sendRetry'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-fana-navy/70 backdrop-blur-sm p-0 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={t('form.title')}
        className="relative w-full sm:max-w-md max-h-[92svh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={th('modalClose')}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 pr-10">{t('form.title')}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="fullName" required value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder={t('form.fullName')} className={inputClass} />
          <input type="tel" name="phone" required value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder={t('form.phone')} className={inputClass} />
          <input type="email" name="email" required value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={t('form.email')} className={inputClass} />
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">{t('form.serviceOptions')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {QUOTE_SERVICES.map((s) => (
                <label key={s.id}
                  className={`flex items-center gap-2 p-3 border-2 rounded-xl cursor-pointer transition-colors ${
                    formData.services.includes(s.id)
                      ? 'border-fana-primary bg-fana-secondary/30'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  <input type="checkbox" checked={formData.services.includes(s.id)}
                    onChange={() => toggleService(s.id)}
                    className="w-4 h-4 text-fana-primary rounded" />
                  <span className="text-sm text-gray-700">{t(`form.services.${s.key}`)}</span>
                </label>
              ))}
            </div>
          </div>
          <button type="submit" disabled={isSubmitting}
            className="w-full bg-fana-primary text-white py-3.5 rounded-full font-semibold hover:bg-fana-navy transition-colors disabled:opacity-50">
            {isSubmitting ? '...' : t('form.submitButton')}
          </button>
          {status.type && (
            <p className={`p-3 rounded-xl text-sm font-medium ${
              status.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>{status.message}</p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const t = useTranslations('newDesign.heroV2');
  const nav = useTranslations('navigation');
  const params = useParams();
  const locale = (params.locale as string) || 'es';

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  const navItems = [
    { href: `/${locale}`, label: nav('home') },
    { href: `/${locale}/nosotros`, label: nav('about') },
    { href: `/${locale}/servicios`, label: nav('services') },
    { href: `/${locale}/materiales`, label: nav('materials') },
    { href: `/${locale}/contacto`, label: nav('contact') },
  ];

  const go = (i: number) => setActive((i + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (paused || quoteOpen) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, paused, quoteOpen]);

  const slide = SLIDES[active];
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="bg-fana-secondary p-2 sm:p-4 lg:p-5">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] lg:rounded-[2.25rem] min-h-[calc(100svh-1rem)] sm:min-h-[calc(100svh-2rem)] lg:min-h-[calc(100svh-2.5rem)] flex flex-col text-white bg-fana-navy">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero/doctor-dientes.jpeg"
            alt="Técnico de laboratorio dental sosteniendo un puente de zirconio frente a una fresadora CNC"
            fill
            priority
            quality={85}
            sizes="100vw"
            className="object-cover object-[72%_center] sm:object-[65%_center] lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-fana-navy/70 via-fana-navy/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-fana-navy/80 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-fana-navy/50 to-transparent" />
        </div>

        {/* Floating nav */}
        <header className="relative z-30 flex items-center justify-between gap-3 p-3 sm:p-5 lg:p-6">
          <Link href={`/${locale}`} className="relative block h-12 w-36 sm:h-16 sm:w-48 lg:h-20 lg:w-60 shrink-0">
            <Image src="/images/logo/logo-fana-2.png" alt="FANA Milling Center" fill priority
              className="object-contain object-left" sizes="240px" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-2 py-1.5">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-white/90 hover:bg-white/20 hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block rounded-full bg-white [&>div>button]:border-0 [&>div>button]:rounded-full">
              <LanguageSwitcher currentLocale={locale} />
            </div>
            <button onClick={() => setQuoteOpen(true)}
              className="hidden sm:flex items-center gap-1 pl-5 pr-1 py-1 rounded-full bg-white text-fana-navy text-sm font-bold uppercase tracking-wide group">
              {t('cta')}
              <span className="w-9 h-9 rounded-full bg-fana-navy text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowRightIcon className="w-4 h-4" />
              </span>
            </button>
            <button onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? t('menuClose') : t('menuOpen')} aria-expanded={menuOpen}
              className="lg:hidden w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
              {menuOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
            </button>
          </div>

        </header>

        {/* Content */}
        <div className="relative z-20 flex-1 flex flex-col justify-center lg:justify-between gap-8 px-4 pt-6 pb-16 sm:px-8 sm:pb-8 lg:px-12 lg:pb-10">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start lg:pt-8">
            <motion.h1
              className="lg:col-span-7 text-white text-[2.25rem] leading-[1.05] sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-semibold uppercase tracking-tight"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            >
              {t('title')}
            </motion.h1>
            <motion.p
              className="lg:col-span-4 lg:col-start-9 lg:mt-24 text-base sm:text-lg text-white/90 max-w-md"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            >
              {t('description')}
            </motion.p>
          </div>

          <div className="hidden lg:flex flex-col-reverse lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* Chips */}
            <div className="flex flex-wrap gap-2 lg:max-w-md" role="tablist" aria-label={t('slideLabel')}>
              {SLIDES.map((s, i) => (
                <button key={s.id} role="tab" aria-selected={i === active}
                  onClick={() => go(i)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-colors ${
                    i === active
                      ? 'bg-white text-fana-navy border-white'
                      : 'bg-white/10 text-white border-white/30 backdrop-blur-md hover:bg-white/20'
                  }`}>
                  {t(`slides.${s.id}.chip`)}
                </button>
              ))}
            </div>

            {/* Progress + featured card */}
            <div className="w-full lg:w-[26rem] space-y-4"
              onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
              <div className="flex items-center gap-3 text-sm tabular-nums">
                <button onClick={() => go(active - 1)} aria-label={t('prev')}
                  className="w-8 h-8 -ml-1 flex items-center justify-center rounded-full hover:bg-white/15">
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <span>{pad(active + 1)}</span>
                <div className="relative flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    key={`${active}-${paused}`}
                    className="absolute inset-y-0 left-0 bg-white"
                    initial={{ width: '0%' }}
                    animate={{ width: paused ? '0%' : '100%' }}
                    transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                  />
                </div>
                <span>{pad(SLIDES.length)}</span>
                <button onClick={() => go(active + 1)} aria-label={t('next')}
                  className="w-8 h-8 -mr-1 flex items-center justify-center rounded-full hover:bg-white/15">
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  className="flex items-stretch gap-3 rounded-2xl bg-white text-fana-navy p-2.5 shadow-xl"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-24 sm:w-28 aspect-[4/5] shrink-0 overflow-hidden rounded-xl bg-fana-secondary">
                    <Image src={slide.image} alt={t(`slides.${slide.id}.title`)} fill
                      className="object-cover" sizes="112px" />
                  </div>
                  <div className="flex flex-col justify-between py-1 min-w-0">
                    <div>
                      <p className="font-semibold text-lg leading-tight">{t(`slides.${slide.id}.title`)}</p>
                      <p className="text-sm text-gray-500">{t(`slides.${slide.id}.subtitle`)}</p>
                    </div>
                    <p className="text-sm font-semibold">
                      {t(`slides.${slide.id}.meta`)}{' '}
                      <span className="font-normal text-gray-500">· {t('experience')}</span>
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <>
                <motion.div
                  key="menu-backdrop"
                  className="lg:hidden fixed inset-0 z-[9100] bg-fana-navy/40 backdrop-blur-[2px]"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setMenuOpen(false)}
                />
                <motion.aside
                  key="menu-drawer"
                  role="dialog" aria-modal="true" aria-label={t('menuOpen')}
                  className="lg:hidden fixed inset-y-2 right-2 z-[9200] w-[88vw] max-w-md flex flex-col rounded-[1.75rem] bg-fana-navy/45 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.45)] text-white p-5 overflow-y-auto"
                  initial={{ x: '110%' }} animate={{ x: 0 }} exit={{ x: '110%' }}
                  transition={{ type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.4 }}
                >
                  <div className="flex justify-end">
                    <button onClick={() => setMenuOpen(false)} aria-label={t('menuClose')}
                      className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <ul className="flex flex-col mt-6">
                    {navItems.map((item, i) => (
                      <motion.li key={item.href}
                        initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.05, duration: 0.35 }}>
                        <Link href={item.href} onClick={() => setMenuOpen(false)}
                          className="block py-4 text-2xl font-medium !text-white border-b border-white/10 hover:!text-white/70 transition-colors">
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6 flex items-center gap-3">
                    <div className="rounded-full bg-white [&>div>button]:border-0 [&>div>button]:rounded-full">
                      <LanguageSwitcher currentLocale={locale} dropUp />
                    </div>
                    <button onClick={() => { setMenuOpen(false); setQuoteOpen(true); }}
                      className="flex-1 py-3.5 rounded-full bg-white text-fana-navy text-sm font-bold uppercase tracking-wide">
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
    </section>
  );
}
