'use client';

import { useTranslations } from 'next-intl';
import { PhoneIcon } from '@heroicons/react/24/solid';

/** Fixed call button, bottom-right on every page. Opens the phone dialer. */
export default function FloatingCallButton() {
  const footer = useTranslations('footer');
  const t = useTranslations('newDesign.homePage.cta2');

  const number = footer('contact.phone.number');
  const href = `tel:${number.replace(/[^\d+]/g, '')}`;
  const label = `${t('contact.phone.title')} ${number}`;

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      className="fixed z-[9000] right-4 bottom-4 sm:right-6 sm:bottom-6 w-14 h-14 rounded-full bg-fana-primary text-white flex items-center justify-center shadow-[0_12px_30px_-8px_rgba(18,93,163,0.6)] transition-colors duration-300 hover:bg-fana-navy focus:outline-none focus-visible:ring-4 focus-visible:ring-fana-primary/40"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <PhoneIcon className="w-6 h-6" />
    </a>
  );
}
