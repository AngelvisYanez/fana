'use client';

import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useTranslations } from 'next-intl';

export default function PoliticaPrivacidadPage() {
  const t = useTranslations('legal.privacy');
  
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
                  <p className="text-gray-600">
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
                    {t('sections.responsible.title')}
                  </h3>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-700 leading-relaxed">
                      {t('sections.responsible.content')}
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
                    {t('sections.purpose.title')}
                  </h3>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {t('sections.purpose.intro')}
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>
                          <strong>{t('sections.purpose.items.service')}</strong>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>
                          <strong>{t('sections.purpose.items.billing')}</strong>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>
                          <strong>{t('sections.purpose.items.communication')}</strong>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>
                          <strong>{t('sections.purpose.items.marketing')}</strong>
                        </div>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Section 3 */}
                <motion.div 
                  className="mb-12"
                  variants={fadeInUp}
                >
                  <h3 className="font-heading text-2xl text-fana-navy mb-5 flex items-baseline gap-4">
                    <span className="font-heading text-xl text-fana-primary">3</span>
                    {t('sections.legalBasis.title')}
                  </h3>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {t('sections.legalBasis.intro')}
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>
                          <strong>{t('sections.legalBasis.items.contract')}</strong>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>
                          <strong>{t('sections.legalBasis.items.legitimate')}</strong>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>
                          <strong>{t('sections.legalBasis.items.consent')}</strong>
                        </div>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Section 4 */}
                <motion.div 
                  className="mb-12"
                  variants={fadeInUp}
                >
                  <h3 className="font-heading text-2xl text-fana-navy mb-5 flex items-baseline gap-4">
                    <span className="font-heading text-xl text-fana-primary">4</span>
                    {t('sections.dataCategories.title')}
                  </h3>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {t('sections.dataCategories.intro')}
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>
                          <strong>{t('sections.dataCategories.items.professional')}</strong>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>
                          <strong>{t('sections.dataCategories.items.transactional')}</strong>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>
                          <strong>{t('sections.dataCategories.items.health')}</strong>
                        </div>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Section 5 */}
                <motion.div 
                  className="mb-12"
                  variants={fadeInUp}
                >
                  <h3 className="font-heading text-2xl text-fana-navy mb-5 flex items-baseline gap-4">
                    <span className="font-heading text-xl text-fana-primary">5</span>
                    {t('sections.recipients.title')}
                  </h3>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {t('sections.recipients.intro')}
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>{t('sections.recipients.items.hosting')}</div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-fana-primary rounded-full mt-2 flex-shrink-0"></span>
                        <div>{t('sections.recipients.items.transport')}</div>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Section 6 */}
                <motion.div 
                  className="mb-12"
                  variants={fadeInUp}
                >
                  <h3 className="font-heading text-2xl text-fana-navy mb-5 flex items-baseline gap-4">
                    <span className="font-heading text-xl text-fana-primary">6</span>
                    {t('sections.rights.title')}
                  </h3>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-gray-700 leading-relaxed">
                      {t('sections.rights.content')}
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