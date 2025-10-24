'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesNavigation from '@/components/ServicesNavigation';
import OurServicesSection from '@/components/OurServicesSection';
import Footer from '@/components/Footer';
import { CheckIcon, ArrowRightIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, counterAnimation, viewportOptions } from '@/lib/animations';
import PageTransition from '@/components/PageTransition';

export default function Home() {
  const params = useParams();
  const locale = params.locale as string || 'es';
  const t = useTranslations('newDesign.homePage');

  const stats = [
    { value: t('stats.completedCases.value'), label: t('stats.completedCases.label') },
    { value: t('stats.deliveryTime.value'), label: t('stats.deliveryTime.label') },
    { value: t('stats.customerSatisfaction.value'), label: t('stats.customerSatisfaction.label') },
    { value: t('stats.precision.value'), label: t('stats.precision.label') }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Header />
        <HeroSection />
        <AboutSection />
        <ServicesNavigation />
        <OurServicesSection />
        
        {/* Stats Section */}
        <section className="bg-fana-primary py-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center text-white"
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
              variants={staggerContainer}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={counterAnimation}
                  whileHover={{ scale: 1.1, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <motion.div 
                    className="text-blue-100"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
              variants={fadeInUp}
            >
              {t('whyChooseUs.title').split(' FANA?')[0]} <span className="text-fana-primary">FANA?</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              {t('whyChooseUs.subtitle')}
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={staggerContainer}
          >
            {[
              {
                title: t('whyChooseUs.features.precision.title'),
                description: t('whyChooseUs.features.precision.description')
              },
              {
                title: t('whyChooseUs.features.delivery.title'),
                description: t('whyChooseUs.features.delivery.description')
              },
              {
                title: t('whyChooseUs.features.materials.title'),
                description: t('whyChooseUs.features.materials.description')
              },
              {
                title: t('whyChooseUs.features.technology.title'),
                description: t('whyChooseUs.features.technology.description')
              },
              {
                title: t('whyChooseUs.features.support.title'),
                description: t('whyChooseUs.features.support.description')
              },
              {
                title: t('whyChooseUs.features.quality.title'),
                description: t('whyChooseUs.features.quality.description')
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 p-8 rounded-2xl"
                variants={staggerItem}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-fana-primary rounded-full flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckIcon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
              variants={fadeInUp}
            >
              {t('testimonials.title').split(' Nuestros Clientes')[0]} <span className="text-fana-primary">{t('testimonials.title').split(' ').slice(-2).join(' ')}</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              {t('testimonials.subtitle')}
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={staggerContainer}
          >
            {[
              {
                initial: 'M',
                name: t('testimonials.items.maria.name'),
                position: t('testimonials.items.maria.position'),
                text: t('testimonials.items.maria.text')
              },
              {
                initial: 'C',
                name: t('testimonials.items.carlos.name'),
                position: t('testimonials.items.carlos.position'),
                text: t('testimonials.items.carlos.text')
              },
              {
                initial: 'A',
                name: t('testimonials.items.ana.name'),
                position: t('testimonials.items.ana.position'),
                text: t('testimonials.items.ana.text')
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md"
                variants={staggerItem}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="w-12 h-12 bg-fana-primary rounded-full flex items-center justify-center text-white font-bold text-lg"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {testimonial.initial}
                  </motion.div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.span 
                      key={i} 
                      className="text-yellow-400 text-xl"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section 1 - Services */}
      <section className="bg-gradient-to-br from-fana-primary to-fana-navy py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center text-white"
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              variants={fadeInUp}
            >
              {t('cta1.title')}
            </motion.h2>
            <motion.p 
              className="text-xl text-blue-100 mb-8"
              variants={fadeInUp}
            >
              {t('cta1.subtitle')}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Link href={`/${locale}/servicios`}>
                <motion.div 
                  className="bg-white text-fana-primary px-8 py-4 rounded-lg hover:bg-fana-secondary transition-colors font-medium text-lg shadow-lg inline-flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('cta1.viewServicesButton')}
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </motion.div>
              </Link>
              <Link href={`/${locale}/contacto`}>
                <motion.div 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-fana-primary transition-colors font-medium text-lg inline-flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('cta1.requestQuoteButton')}
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

     

      {/* CTA Section 2 - Contact */}
      <section className="bg-gradient-to-br from-fana-secondary to-fana-white py-16 text-gray-800 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              variants={fadeInUp}
            >
              {t('cta2.title')}
            </motion.h2>
            <motion.p 
              className="text-xl text-fana-primary mb-8"
              variants={fadeInUp}
            >
              {t('cta2.subtitle')}
            </motion.p>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8"
              variants={staggerContainer}
            >
              {[
                { 
                  Icon: PhoneIcon, 
                  title: t('cta2.contact.phone.title'), 
                  text: t('cta2.contact.phone.value')
                },
                { Icon: EnvelopeIcon, title: t('cta2.contact.email.title'), text: t('cta2.contact.email.value') },
                { Icon: MapPinIcon, title: t('cta2.contact.location.title'), text: t('cta2.contact.location.value') }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg"
                  variants={staggerItem}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="mb-3 flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <item.Icon className="w-12 h-12 text-fana-primary" />
                  </motion.div>
                  <h3 className="font-bold mb-2 text-fana-primary">{item.title}</h3>
                  <p className="text-fana-navy text-sm">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link href={`/${locale}/contacto`}>
                <motion.div 
                  className="bg-fana-primary text-white px-10 py-4 rounded-lg hover:bg-fana-navy hover:text-white transition-colors font-medium text-lg shadow-lg inline-flex items-center cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('cta2.contactButton')}
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      </div>
    </PageTransition>
  );
}
