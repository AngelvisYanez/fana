'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRightIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const inputClass =
  'w-full px-4 py-3.5 text-base bg-white/60 backdrop-blur-sm border border-white/70 rounded-xl outline-none text-fana-navy placeholder-gray-500 shadow-sm focus:bg-white/80 focus:ring-2 focus:ring-fana-primary focus:border-transparent transition';

/** Keeps digits only (max 10) and formats them as (305) 555-0123. */
const formatUS = (raw: string) => {
  const d = raw.replace(/\D/g, '').slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

/** Split layout: pitch + contact details on the left, quote form on the right. */
export default function ContactSplit({ locale }: { locale: string }) {
  const t = useTranslations('newDesign.homePage.cta2');
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const rows = [
    { Icon: PhoneIcon, title: t('contact.phone.title'), text: t('contact.phone.value') },
    { Icon: EnvelopeIcon, title: t('contact.email.title'), text: t('contact.email.value') },
    {
      Icon: MapPinIcon,
      title: t('contact.location.title'),
      text: t('contact.location.value'),
      linkText: t('contact.location.linkText'),
      linkUrl: t('contact.location.googleLink'),
    },
  ];

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: null, message: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, phone: `+1 ${form.phone}`, company: '', service: '' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || t('form.error'));
      setStatus({ type: 'success', message: t('form.success') });
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err instanceof Error ? err.message : t('form.error') });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="bg-white py-24 sm:py-28 lg:py-36 overflow-hidden" data-locale={locale}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 lg:items-center">
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal uppercase !leading-[1.15] text-fana-navy">
              {t('title')}
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-md">{t('subtitle')}</p>

            <ul className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
              {rows.map(({ Icon, title, text, linkText, linkUrl }) => (
                <li key={title} className="flex items-start gap-5 py-5">
                  <span className="shrink-0 w-11 h-11 rounded-full bg-fana-secondary text-fana-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-heading text-lg text-fana-navy">{title}</p>
                    <p className="mt-0.5 text-gray-600 break-words">{text}</p>
                    {linkUrl && (
                      <a
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-sm text-fana-primary underline underline-offset-4"
                      >
                        {linkText}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-6 relative isolate rounded-3xl bg-white/25 backdrop-blur-2xl border border-white/80 ring-1 ring-fana-primary/10 shadow-[0_8px_40px_rgba(21,94,168,0.15),inset_0_1px_0_rgba(255,255,255,0.7)] p-6 sm:p-10 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute -z-10 -top-16 -right-12 w-64 h-64 rounded-full bg-fana-primary/45 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -z-10 -bottom-20 -left-10 w-72 h-72 rounded-full bg-sky-400/50 blur-3xl" />
            <h3 className="font-heading text-2xl text-fana-navy mb-2">{t('form.title')}</h3>
            <input type="text" required value={form.name} onChange={set('name')} placeholder={t('form.name')} className={inputClass} />
            <div className="grid gap-4">
              <div className="flex">
                <span className="inline-flex items-center gap-1.5 px-4 rounded-l-xl border border-r-0 border-white/70 bg-white/40 backdrop-blur-sm text-fana-navy font-medium select-none">
                  <svg viewBox="0 0 24 16" className="w-6 h-4 rounded-[3px] shadow-sm" aria-hidden="true">
                    <rect width="24" height="16" fill="#fff" />
                    {[0, 2, 4, 6, 8, 10, 12].map((i) => (
                      <rect key={i} y={i * 1.2307} width="24" height="1.2307" fill="#B22234" />
                    ))}
                    <rect width="10" height="8.6" fill="#3C3B6E" />
                  </svg>
                  +1
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  required
                  pattern="\(\d{3}\) \d{3}-\d{4}"
                  title="(305) 555-0123"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: formatUS(e.target.value) }))}
                  placeholder="(305) 555-0123"
                  className={`${inputClass} !rounded-l-none min-w-0`}
                />
              </div>
              <input type="email" required value={form.email} onChange={set('email')} placeholder={t('form.email')} className={inputClass} />
            </div>
            <textarea required rows={5} value={form.message} onChange={set('message')} placeholder={t('form.message')} className={`${inputClass} resize-none`} />

            {status.type && (
              <p className={`text-sm ${status.type === 'success' ? 'text-green-700' : 'text-red-600'}`} role="status">
                {status.message}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-4 rounded-full bg-fana-primary text-white pl-8 pr-2 py-2 font-medium hover:bg-fana-navy transition-colors disabled:opacity-60"
            >
              {sending ? t('form.sending') : t('form.submit')}
              <span className="w-11 h-11 rounded-full bg-white text-fana-primary flex items-center justify-center">
                <ArrowRightIcon className="w-5 h-5" />
              </span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
