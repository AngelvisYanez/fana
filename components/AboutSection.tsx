'use client';

import { CheckIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, staggerItem, viewportOptions, mobileViewportOptions } from '@/lib/animations';
import { useMobile } from '@/lib/useMobile';

export default function AboutSection() {
  const t = useTranslations('newDesign.about');
  const params = useParams();
  const locale = params.locale as string || 'es';
  const isMobile = useMobile();
  
  const features = [
    t('features.feature1'),
    t('features.feature2'),
    t('features.feature3')
  ];

  return (
    <section className="bg-white py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div 
            className="relative"
            initial="initial"
            whileInView="animate"
            viewport={isMobile ? mobileViewportOptions : viewportOptions}
            variants={slideInLeft}
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Main circular image container */}
              <div className="relative aspect-square">
                {/* Background decorative circles */}
                <motion.div 
                  className="absolute inset-0 bg-blue-100 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                
                {/* Main image circle */}
                <motion.div 
                  className="absolute inset-4 rounded-full overflow-hidden bg-blue-100"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Laboratory Video */}
                  <div className="relative w-full h-full z-10">
                    <video
                      src="/images/hero/fana.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            className="space-y-6"
            initial="initial"
            whileInView="animate"
            viewport={isMobile ? mobileViewportOptions : viewportOptions}
            variants={staggerContainer}
          >
            {/* Subtitle */}
            <motion.div 
              className="text-fana-primary font-semibold text-sm uppercase tracking-wider font-body"
              variants={fadeInUp}
            >
              {t('badge')}
            </motion.div>

            {/* Main Title */}
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight font-heading tracking-tight"
              variants={fadeInUp}
            >
              <span className="text-fana-primary">{t('title.part1')}</span>
              <br />
              <span className="text-gray-800">{t('title.part2')}</span>
            </motion.h2>

            {/* Description */}
            <motion.p 
              className="text-lg text-gray-600 leading-relaxed font-body"
              variants={fadeInUp}
            >
              {t('description')}
            </motion.p>

            {/* Features List */}
            <motion.div 
              className="space-y-3"
              variants={staggerContainer}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-3"
                  variants={staggerItem}
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="w-5 h-5 bg-fana-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckIcon className="w-3 h-3 text-white stroke-2" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 font-body">{feature}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              className="pt-2"
              variants={fadeInUp}
            >
              <Link href={`/${locale}/servicios`}>
                <motion.button 
                  className="bg-fana-primary text-white px-8 py-3 rounded-lg hover:bg-fana-navy hover:text-white transition-colors font-semibold text-sm shadow-md hover:shadow-lg font-body tracking-wide"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('cta')}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}