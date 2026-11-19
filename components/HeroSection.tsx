'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, staggerItem } from '@/lib/animations';

export default function HeroSection() {
  const t = useTranslations('newDesign.hero');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    services: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Verificar que al menos un servicio esté seleccionado
      if (formData.services.length === 0) {
        setSubmitStatus({
          type: 'error',
          message: t('form.error.serviceRequired')
        });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(`${window.location.origin}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: '',
          message: `Solicitud de cotización desde el formulario principal para los siguientes servicios: ${formData.services.join(', ')}`,
          service: formData.services.join(', ')
        }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Respuesta no es JSON:', text);
        throw new Error(t('form.error.server'));
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('form.error.send'));
      }

      // Éxito
      setSubmitStatus({
        type: 'success',
        message: data.message || t('form.successMessage')
      });

      // Limpiar formulario
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        services: []
      });

      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);

    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : t('form.error.sendRetry')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { id: 'estructuras', label: t('form.services.implantStructures') },
    { id: 'coronas', label: t('form.services.crownsAndBridges') },
    { id: 'estetica', label: t('form.services.advancedAesthetics') },
    { id: 'provisional', label: t('form.services.provisionalRestorations') }
  ];

  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/images/hero/hero-video.mp4" type="video/mp4" />
            {/* Fallback image if video not supported */}
            <Image
              src="/images/hero/hero-background.png"
              alt="Fresadora CNC de 5 ejes para prótesis dentales FANA"
              fill
              priority
              quality={90}
              className="object-cover"
              sizes="100vw"
            />
          </video>
        </div>
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/70 z-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-6 py-12"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-fana-primary/20 backdrop-blur-sm border border-fana-primary/30 text-fana-secondary px-4 py-2 rounded-full text-sm font-medium"
              variants={fadeInUp}
            >
              <span className="w-2 h-2 bg-fana-primary rounded-full animate-pulse"></span>
              {t('badge')}
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-white font-heading tracking-tight"
              variants={fadeInUp}
            >
              {t('title').split(' de Precisión')[0]}{' '}
              <span className="text-fana-primary">
                {t('title').includes('de Precisión') ? 'de Precisión' : t('title').split(' ').slice(-2).join(' ')}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl font-body"
              variants={fadeInUp}
            >
            {t('description')}
          </motion.p>
        </motion.div>

          {/* Right Content - Quote Form */}
          <motion.div 
            className="lg:ml-auto w-full max-w-md mb-8 md:mb-12 lg:mb-16"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="bg-white rounded-2xl shadow-2xl px-3 pt-3 pb-7 sm:px-4 sm:pt-4 sm:pb-8 md:px-6 md:pt-6 md:pb-12 lg:px-8 lg:pt-8 lg:pb-14"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-3 md:mb-4 lg:mb-6 font-heading tracking-tight">
                {t('form.title')}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder={t('form.fullName')}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-fana-primary focus:border-transparent transition-all outline-none font-body text-gray-700 placeholder-gray-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('form.phone')}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-fana-primary focus:border-transparent transition-all outline-none font-body text-gray-700 placeholder-gray-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('form.email')}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-fana-primary focus:border-transparent transition-all outline-none font-body text-gray-700 placeholder-gray-500"
                  />
                </div>

                {/* Service Options */}
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-2 md:mb-3 font-body">
                    {t('form.serviceOptions')}
                  </label>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {services.map((service) => (
                      <motion.label
                        key={service.id}
                        className={`flex items-center p-2 md:p-2.5 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.services.includes(service.id)
                            ? 'border-fana-primary bg-fana-secondary/20'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service.id)}
                          onChange={() => handleServiceToggle(service.id)}
                          className="w-3.5 h-3.5 md:w-4 md:h-4 text-fana-primary rounded focus:ring-2 focus:ring-fana-primary"
                        />
                        <span className="ml-1.5 md:ml-2 text-xs md:text-sm text-gray-700 font-body">{service.label}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-fana-primary text-white py-2.5 md:py-3 lg:py-4 rounded-lg font-semibold text-sm md:text-base lg:text-lg shadow-lg hover:bg-fana-navy transition-colors font-body tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 20px 40px -10px rgba(18, 93, 163, 0.5)" } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? 'Enviando...' : t('form.submitButton')}
              </motion.button>

              {/* Status Messages */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-lg ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}
                >
                  <p className="text-sm font-medium">{submitStatus.message}</p>
                </motion.div>
              )}
            </form>
          </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
