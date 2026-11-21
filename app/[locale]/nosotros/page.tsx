'use client';

import Header from '@/components/Header';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AboutPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('about');

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Header />
      <AboutSection />
      
      {/* Additional About Content */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
              {t('history.title')}
            </h2>
            
            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-full min-h-[400px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/services/Historia.jpg"
                    alt="Equipo FANA Milling Center"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                    priority
                  />
                </div>
              </div>
              
              {/* Text Content */}
              <div className="order-1 lg:order-2 flex flex-col justify-center">
                <div className="prose prose-lg max-w-none text-gray-600">
                  <p className="mb-6 text-base md:text-lg leading-relaxed">
                    {t('history.paragraph1')}
                  </p>
                  <p className="mb-6 text-base md:text-lg leading-relaxed">
                    {t('history.paragraph2')}
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    {t('history.paragraph3')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="bg-fana-secondary py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-fana-navy mb-4">
              {t('cta.title')}
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={`/${locale}/contacto`} 
                className="bg-fana-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-fana-navy hover:text-white transition-colors"
              >
                {t('cta.contactButton')}
              </Link>
              <Link 
                href={`/${locale}/servicios`} 
                className="border border-fana-primary text-fana-primary px-6 py-3 rounded-lg font-medium hover:bg-fana-primary hover:text-white transition-colors"
              >
                {t('cta.servicesButton')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </PageTransition>
  );
}

