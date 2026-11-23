'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { ArrowRightIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

/**
 * IMÁGENES — pon aquí la ruta (por ejemplo '/images/contact/contact-hero.jpg').
 * Mientras valga `null` se muestra un contenedor vacío con el tamaño recomendado.
 */
const IMAGES = {
  hero: '/images/contact/contact-hero.jpg' as string | null, // banner superior · 2560 × 1100 (21:9)
};

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

const fieldClass =
  'w-full px-4 py-3.5 text-base bg-white/60 backdrop-blur-sm border border-white/70 rounded-xl outline-none text-fana-navy placeholder-gray-500 shadow-sm focus:bg-white/80 focus:ring-2 focus:ring-fana-primary focus:border-transparent transition';

/** Keeps digits only (max 10) and formats them as (305) 555-0123. */
const formatUS = (raw: string) => {
  const d = raw.replace(/\D/g, '').slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

export default function ContactoPage() {
  const t = useTranslations('contact');
  const nav = useTranslations('navigation');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch(`${window.location.origin}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, phone: formData.phone ? `+1 ${formData.phone}` : '' }),
      });

      // Verificar que la respuesta sea JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Respuesta no es JSON:', text);
        throw new Error(t('form.error.server'));
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('form.error.send'));
      }

      // Éxito
      setSubmitStatus({
        type: 'success',
        message: data.message || t('form.success')
      });

      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        service: ''
      });

      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);

    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : t('form.error.sendRetry')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const infoRows = [
    {
      Icon: PhoneIcon,
      title: t('info.phone.title'),
      text: t('info.phone.number'),
      note: t('info.phone.hours'),
      href: `tel:${t('info.phone.number').replace(/[^\d+]/g, '')}`,
      external: false,
    },
    {
      Icon: EnvelopeIcon,
      title: t('info.email.title'),
      text: t('info.email.address'),
      note: t('info.email.response'),
      href: `mailto:${t('info.email.address')}`,
      external: false,
    },
    {
      Icon: MapPinIcon,
      title: t('info.address.title'),
      text: [t('info.address.street'), t('info.address.city')].filter(Boolean).join(', '),
      note: t('info.address.visits'),
      href: t('info.address.googleLink'),
      external: true,
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        <PageHero
          title={nav('contact')}
          image={IMAGES.hero}
          imageClassName="object-[80%_50%] sm:object-center"
        />

        <section className="bg-white py-16 sm:py-20 lg:py-28 overflow-x-clip">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left: pitch + contact details */}
              <motion.div {...reveal} className="lg:col-span-5">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal uppercase !leading-[1.15] text-fana-navy">
                  {t('title')}
                </h2>
                <p className="mt-6 max-w-md text-base sm:text-lg leading-relaxed text-gray-600">
                  {t('subtitle')}
                </p>

                <ul className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
                  {infoRows.map(({ Icon, title, text, note, href, external }) => (
                    <li key={title}>
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group flex items-start gap-5 py-5"
                      >
                        <span className="shrink-0 w-11 h-11 rounded-full bg-fana-secondary text-fana-primary flex items-center justify-center transition-colors group-hover:bg-fana-primary group-hover:text-white">
                          <Icon className="w-5 h-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-heading text-lg text-fana-navy">{title}</span>
                          <span className="mt-0.5 block text-gray-600 break-words">{text}</span>
                          <span className="mt-1 block text-sm text-gray-500">{note}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Right: glass form, same look as the home contact */}
              <motion.form
                onSubmit={handleSubmit}
                className="lg:col-span-7 lg:self-start lg:sticky lg:top-6 relative isolate rounded-3xl bg-white/25 backdrop-blur-2xl border border-white/80 ring-1 ring-fana-primary/10 shadow-[0_8px_40px_rgba(21,94,168,0.15),inset_0_1px_0_rgba(255,255,255,0.7)] p-6 sm:p-10 space-y-4"
                initial={reveal.initial}
                whileInView={reveal.whileInView}
                viewport={reveal.viewport}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div aria-hidden="true" className="pointer-events-none absolute -z-10 -top-16 -right-12 w-64 h-64 rounded-full bg-fana-primary/45 blur-3xl" />
                <div aria-hidden="true" className="pointer-events-none absolute -z-10 -bottom-20 -left-10 w-72 h-72 rounded-full bg-sky-400/50 blur-3xl" />

                <h2 className="font-heading text-2xl text-fana-navy mb-2">{t('form.sendMessage')}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="sr-only">{t('form.fullName')}</label>
                    <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('form.fullName')} className={fieldClass} required />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">{t('form.email')}</label>
                    <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('form.email')} className={fieldClass} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <label htmlFor="phone" className="sr-only">{t('form.phone')}</label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: formatUS(e.target.value) })}
                      placeholder="(305) 555-0123"
                      className={`${fieldClass} !rounded-l-none min-w-0`}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="sr-only">{t('form.clinicName')}</label>
                    <input id="company" type="text" name="company" value={formData.company} onChange={handleChange} placeholder={t('form.clinicName')} className={fieldClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="sr-only">{t('form.serviceType')}</label>
                  <select id="service" name="service" value={formData.service} onChange={handleChange} className={`${fieldClass} ${formData.service ? '' : 'text-gray-500'}`}>
                    <option value="">{t('form.selectService')}</option>
                    <option value="estructuras">{t('form.services.estructuras')}</option>
                    <option value="estetica">{t('form.services.estetica')}</option>
                    <option value="suministros">{t('form.services.suministros')}</option>
                    <option value="otro">{t('form.services.otro')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">{t('form.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`${fieldClass} resize-none`}
                    placeholder={t('form.messagePlaceholder')}
                  />
                </div>

                {submitStatus.type && (
                  <p
                    role="status"
                    className={`text-sm ${submitStatus.type === 'success' ? 'text-green-700' : 'text-red-600'}`}
                  >
                    {submitStatus.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-4 rounded-full bg-fana-primary text-white pl-8 pr-2 py-2 font-medium hover:bg-fana-navy transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? t('form.submitting') : t('form.submit')}
                  <span className="w-11 h-11 rounded-full bg-white text-fana-primary flex items-center justify-center">
                    <ArrowRightIcon className="w-5 h-5" />
                  </span>
                </button>
              </motion.form>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
