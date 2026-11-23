'use client';

import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useTranslations } from 'next-intl';

export default function PoliticaCookiesPage() {
  const t = useTranslations('legal.cookies');
  
  return (
    <PageTransition>
      <div className="min-h-screen">
        <PageHero title={t('title')} image={null} showPlaceholder={false} />

        {/* Content Section */}
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div 
                className="prose prose-lg max-w-none"
                initial="initial"
                animate="animate"
                variants={staggerContainer}
              >
                <motion.p
                  className="mb-10 text-lg sm:text-xl text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                >
                  {t('subtitle')}
                </motion.p>

                {/* Header */}
                <motion.div 
                  className="rounded-3xl bg-gray-50 p-6 sm:p-8 mb-12"
                  variants={fadeInUp}
                >
                  <h2 className="font-heading text-2xl text-fana-navy mb-2">
                    {t('header.title')}
                  </h2>
                  <p className="text-fana-primary font-semibold mb-2">{t('header.company')}</p>
                  <p className="text-gray-600">
                    <strong>{t('header.registration')}</strong><br/>
                    <strong>{t('header.address')}</strong><br/>
                    <strong>{t('header.county')}</strong><br/>
                    <strong>{t('header.lastUpdate')}</strong>
                  </p>
                </motion.div>

                {/* Section 1 */}
                <motion.div 
                  className="mb-12"
                  variants={fadeInUp}
                >
                  <h3 className="font-heading text-2xl text-fana-navy mb-5 flex items-baseline gap-4">
                    <span className="font-heading text-xl text-fana-primary">1</span>
                    {t('sections.whatAre.title')}
                  </h3>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {t('sections.whatAre.content1')}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {t('sections.whatAre.content2')}
                    </p>
                  </div>
                </motion.div>

                {/* Section 2 */}
                <motion.div 
                  className="mb-12"
                  variants={fadeInUp}
                >
                  <h3 className="font-heading text-2xl text-fana-navy mb-5 flex items-baseline gap-4">
                    <span className="font-heading text-xl text-fana-primary">2</span>
                    {t('sections.types.title')}
                  </h3>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {t('sections.types.intro')}
                    </p>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <h4 className="font-semibold text-fana-navy mb-2">{t('sections.types.technical.title')}</h4>
                        <p className="text-gray-700 text-sm leading-relaxed mb-2">
                          {t('sections.types.technical.content')}
                        </p>
                        <p className="text-gray-600 text-xs">
                          <strong>{t('sections.types.technical.consent')}</strong>
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <h4 className="font-semibold text-fana-navy mb-2">{t('sections.types.preferences.title')}</h4>
                        <p className="text-gray-700 text-sm leading-relaxed mb-2">
                          {t('sections.types.preferences.content')}
                        </p>
                        <p className="text-gray-600 text-xs">
                          <strong>{t('sections.types.preferences.consent')}</strong>
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <h4 className="font-semibold text-fana-navy mb-2">{t('sections.types.analytics.title')}</h4>
                        <p className="text-gray-700 text-sm leading-relaxed mb-2">
                          {t('sections.types.analytics.content')}
                        </p>
                        <p className="text-gray-600 text-xs">
                          <strong>{t('sections.types.analytics.consent')}</strong>
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-2xl">
                        <h4 className="font-semibold text-fana-navy mb-2">{t('sections.types.advertising.title')}</h4>
                        <p className="text-gray-700 text-sm leading-relaxed mb-2">
                          {t('sections.types.advertising.content')}
                        </p>
                        <p className="text-gray-600 text-xs">
                          <strong>{t('sections.types.advertising.consent')}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Section 3 */}
                <motion.div 
                  className="mb-12"
                  variants={fadeInUp}
                >
                  <h3 className="font-heading text-2xl text-fana-navy mb-5 flex items-baseline gap-4">
                    <span className="font-heading text-xl text-fana-primary">3</span>
                    {t('sections.thirdParty.title')}
                  </h3>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-700 leading-relaxed">
                      {t('sections.thirdParty.content')}
                    </p>
                  </div>
                </motion.div>

                {/* Section 4 */}
                <motion.div 
                  className="mb-12"
                  variants={fadeInUp}
                >
                  <h3 className="font-heading text-2xl text-fana-navy mb-5 flex items-baseline gap-4">
                    <span className="font-heading text-xl text-fana-primary">4</span>
                    {t('sections.consent.title')}
                  </h3>
                  <div className="border-t border-gray-200 pt-6">
                    <div className="space-y-6 text-gray-700">
                      <div>
                        <h4 className="font-semibold text-fana-navy mb-3">{t('sections.consent.obtaining.title')}</h4>
                        <p className="mb-3">
                          {t('sections.consent.obtaining.content')}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-fana-navy mb-3">{t('sections.consent.revocation.title')}</h4>
                        <p className="mb-3">
                          {t('sections.consent.revocation.content1')}
                        </p>
                        <p className="mb-3">
                          {t('sections.consent.revocation.content2')}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="bg-gray-50 p-3 rounded-xl">
                            <div className="font-medium text-fana-navy mb-1">{t('sections.consent.revocation.browsers.chrome')}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-xl">
                            <div className="font-medium text-fana-navy mb-1">{t('sections.consent.revocation.browsers.firefox')}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-xl">
                            <div className="font-medium text-fana-navy mb-1">{t('sections.consent.revocation.browsers.safari')}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-xl">
                            <div className="font-medium text-fana-navy mb-1">{t('sections.consent.revocation.browsers.edge')}</div>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-yellow-800 text-sm">
                            <strong>{t('sections.consent.revocation.important')}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Section 5 */}
                <motion.div 
                  className="mb-12"
                  variants={fadeInUp}
                >
                  <h3 className="font-heading text-2xl text-fana-navy mb-5 flex items-baseline gap-4">
                    <span className="font-heading text-xl text-fana-primary">5</span>
                    {t('sections.retention.title')}
                  </h3>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {t('sections.retention.content1')}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {t('sections.retention.content2')}
                    </p>
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div 
                  className="bg-fana-navy text-white p-8 sm:p-10 rounded-3xl text-center"
                  variants={fadeInUp}
                >
                  <h3 className="font-heading text-2xl sm:text-3xl mb-4 text-white">{t('contact.title')}</h3>
                  <p className="text-blue-100 mb-6">
                    {t('contact.subtitle')}
                  </p>
                  <a 
                    href="mailto:info@fanamillingcenter.com"
                    className="inline-flex items-center gap-2 bg-white text-fana-navy px-6 py-3 rounded-full font-medium hover:bg-fana-secondary hover:text-fana-navy transition-colors"
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