'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useTranslations } from 'next-intl';

export default function TerminosServicioPage() {
  const t = useTranslations('legal.terms');
  
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Header />
        
        {/* Hero Section */}
        <section className="bg-fana-secondary py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-fana-primary/10 text-fana-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
                variants={fadeInUp}
              >
                <span className="w-2 h-2 bg-fana-primary rounded-full"></span>
                {t('badge')}
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-fana-navy mb-6 leading-tight"
                variants={fadeInUp}
              >
                <span className="text-fana-primary">{t('title')}</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-600 leading-relaxed"
                variants={fadeInUp}
              >
                {t('subtitle')}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="prose prose-lg max-w-none"
                initial="initial"
                animate="animate"
                variants={staggerContainer}
              >
                {/* Header */}
                <motion.div 
                  className="bg-fana-primary/5 border-l-4 border-fana-primary p-6 rounded-r-lg mb-8"
                  variants={fadeInUp}
                >
                  <h2 className="text-2xl font-bold text-fana-navy mb-2">
                    {t('header.title')}
                  </h2>
                  <p className="text-gray-600">
                    <strong>{t('header.company')}</strong><br/>
                    <strong>{t('header.registration')}</strong><br/>
                    <strong>{t('header.status')}</strong><br/>
                    <strong>{t('header.regDate')}</strong><br/>
                    <strong>{t('header.expDate')}</strong><br/>
                    <strong>{t('header.address')}</strong><br/>
                    <strong>{t('header.county')}</strong><br/>
                    <strong>{t('header.lastUpdate')}</strong>
                  </p>
                </motion.div>

                {/* Section 1 */}
                <motion.div 
                  className="mb-8"
                  variants={fadeInUp}
                >
                  <h3 className="text-xl font-bold text-fana-navy mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-fana-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    {t('sections.object.title')}
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      {t('sections.object.content')}
                    </p>
                  </div>
                </motion.div>

                {/* Section 2 */}
                <motion.div 
                  className="mb-8"
                  variants={fadeInUp}
                >
                  <h3 className="text-xl font-bold text-fana-navy mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-fana-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    {t('sections.services.title')}
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {t('sections.services.intro')}
                    </p>
                    <ul className="space-y-4 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>
                          <strong>{t('sections.services.items.milling')}</strong>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>
                          <strong>{t('sections.services.items.supplies')}</strong>
                        </div>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Section 3 */}
                <motion.div 
                  className="mb-8"
                  variants={fadeInUp}
                >
                  <h3 className="text-xl font-bold text-fana-navy mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-fana-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    {t('sections.process.title')}
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="space-y-4 text-gray-700">
                      <div className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>
                          <strong>{t('sections.process.items.order')}</strong>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>
                          <strong>{t('sections.process.items.quote')}</strong>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>
                          <strong>{t('sections.process.items.delivery')}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Section 4 */}
                <motion.div 
                  className="mb-8"
                  variants={fadeInUp}
                >
                  <h3 className="text-xl font-bold text-fana-navy mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-fana-primary text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    {t('sections.warranty.title')}
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="space-y-4 text-gray-700">
                      <div className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>
                          <strong>{t('sections.warranty.items.product')}</strong>
                        </div>
                      </div>
                      <div>
                        <strong>{t('sections.warranty.items.exclusions')}</strong>
                        <ul className="mt-3 space-y-2 ml-4">
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{t('sections.warranty.items.exclusionItems.design')}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{t('sections.warranty.items.exclusionItems.manipulation')}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 flex-shrink-0"></span>
                            <span>{t('sections.warranty.items.exclusionItems.misuse')}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Section 5 */}
                <motion.div 
                  className="mb-8"
                  variants={fadeInUp}
                >
                  <h3 className="text-xl font-bold text-fana-navy mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 bg-fana-primary text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                    {t('sections.jurisdiction.title')}
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      {t('sections.jurisdiction.content')}
                    </p>
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div 
                  className="bg-fana-primary text-white p-8 rounded-2xl text-center"
                  variants={fadeInUp}
                >
                  <h3 className="text-2xl font-bold mb-4 text-white">{t('contact.title')}</h3>
                  <p className="text-white mb-6">
                    {t('contact.subtitle')}
                  </p>
                  <a 
                    href="mailto:info@fanamillingcenter.com"
                    className="inline-flex items-center gap-2 bg-white text-fana-primary px-6 py-3 rounded-lg font-medium hover:bg-fana-secondary transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {t('contact.button')}
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}