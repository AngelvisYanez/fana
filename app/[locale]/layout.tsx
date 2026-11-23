import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import '../globals.css';
import FloatingCallButton from '@/components/FloatingCallButton';
import JsonLd from '@/components/JsonLd';
import { DEFAULT_LOCALE, SITE_URL, isLocale, pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return {
    metadataBase: new URL(SITE_URL),
    ...pageMetadata(params.locale, 'home'),
    icons: {
      icon: [
        { url: '/images/logo/isologo.png', sizes: '32x32', type: 'image/png' },
        { url: '/images/logo/isologo.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [
        { url: '/images/logo/isologo.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: '/images/logo/isologo.png',
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="antialiased">
        <JsonLd locale={isLocale(locale) ? locale : DEFAULT_LOCALE} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <FloatingCallButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
