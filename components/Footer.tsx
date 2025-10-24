'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Linkedin } from 'lucide-react';

// Instagram Icon Component
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="white">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, viewportOptions } from '@/lib/animations';

export default function Footer() {
  const params = useParams();
  const locale = params.locale as string || 'es';
  const nav = useTranslations('navigation');
  const footer = useTranslations('footer');

  const socialLinks = [
    { Icon: InstagramIcon, href: '#' },
    { Icon: TikTokIcon, href: '#' },
    { Icon: Linkedin, href: 'https://www.linkedin.com/company/fana-milling-center' }
  ];

  return (
    <footer className="bg-gray-900 text-white overflow-hidden">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
          variants={staggerContainer}
        >
          {/* Company Info */}
          <motion.div variants={fadeInUp}>
            <motion.div 
              className="mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative h-20 w-56">
                <Image
                  src="/images/logo/logo-fana-2.png"
                  alt="FANA Milling Center Logo"
                  fill
                  className="object-contain"
                  sizes="192px"
                />
              </div>
            </motion.div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed font-body">
              {footer('description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href }, index) => (
                <motion.a 
                  key={index}
                  href={href}
                  className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-fana-primary transition-colors"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon className="w-4 h-4 text-white" fill="white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-bold mb-6 font-heading tracking-tight">{footer('quickLinks')}</h3>
            <motion.ul 
              className="space-y-3"
              variants={staggerContainer}
            >
              {[
                { href: `/${locale}`, label: nav('home') },
                { href: `/${locale}/nosotros`, label: nav('about') },
                { href: `/${locale}/servicios`, label: nav('services') },
                { href: `/${locale}/materiales`, label: nav('materials') },
                { href: `/${locale}/contacto`, label: nav('contact') }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  variants={staggerItem}
                  whileHover={{ x: 5 }}
                >
                  <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-body">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-bold mb-6 font-heading tracking-tight">{footer('servicesTitle')}</h3>
            <motion.ul 
              className="space-y-3"
              variants={staggerContainer}
            >
              {[
                { href: `/${locale}/servicios`, label: footer('services.generalMilling') },
                { href: `/${locale}/servicios`, label: footer('services.implantStructures') },
                { href: `/${locale}/servicios`, label: footer('services.advancedAesthetics') },
                { href: `/${locale}/materiales`, label: footer('services.b2bSupplies') },
                { href: `/${locale}/servicios`, label: footer('services.qualityControl') }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  variants={staggerItem}
                  whileHover={{ x: 5 }}
                >
                  <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-body">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-bold mb-6 font-heading tracking-tight">{footer('contactTitle')}</h3>
            <motion.ul 
              className="space-y-4"
              variants={staggerContainer}
            >
              {[
                { 
                  Icon: PhoneIcon, 
                  primary: footer('contact.phone.number'),
                  secondary: footer('contact.phone.hours')
                },
                {
                  Icon: EnvelopeIcon,
                  primary: footer('contact.email.address'),
                  secondary: footer('contact.email.response')
                },
                {
                  Icon: MapPinIcon,
                  primary: footer('contact.address.street'),
                  secondary: footer('contact.address.city')
                }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start space-x-3"
                  variants={staggerItem}
                  whileHover={{ x: 5 }}
                >
                  <item.Icon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-sm font-body">{item.primary}</p>
                    <p className="text-gray-500 text-xs font-body">{item.secondary}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.p 
              className="text-gray-400 text-sm text-center md:text-left font-body"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              © {new Date().getFullYear()} FANA Milling Center. {footer('copyright')}
            </motion.p>
            <motion.div 
              className="flex space-x-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div whileHover={{ y: -2 }}>
                <Link href={`/${locale}/politica-privacidad`} className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-body">
                  {footer('legal.privacy')}
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <Link href={`/${locale}/terminos-servicio`} className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-body">
                  {footer('legal.terms')}
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <Link href={`/${locale}/politica-cookies`} className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-body">
                  {footer('legal.cookies')}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}