import type { Metadata } from 'next';
import './globals.css';
import { headers } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import NotFoundContent from '@/components/NotFoundContent';
import FloatingCallButton from '@/components/FloatingCallButton';

export const metadata: Metadata = {
  title: '404 | FANA Milling Center',
  robots: { index: false, follow: false },
};

const SUPPORTED = ['es', 'en'];

/**
 * Global 404. Unmatched URLs (for example /es/anything) are rendered here, outside the
 * [locale] layout, so the locale and messages are resolved again. The next-intl middleware
 * stores the detected locale in the x-next-intl-locale request header;
 * without it the page falls back to English.
 */
export default async function NotFound() {
  const detected = headers().get('x-next-intl-locale') ?? '';
  // English is the default 404 language when the locale cannot be detected.
  const locale = SUPPORTED.includes(detected) ? detected : 'en';
  const messages = (await import(`../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NotFoundContent />
      <FloatingCallButton />
    </NextIntlClientProvider>
  );
}
