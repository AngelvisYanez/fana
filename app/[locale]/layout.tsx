import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import '../globals.css';
import FloatingCallButton from '@/components/FloatingCallButton';

export const metadata: Metadata = {
  title: 'FANA Milling Center | Laboratorio Dental CAD/CAM',
  description: 'Tu socio tecnológico en fabricación dental',
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <FloatingCallButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
