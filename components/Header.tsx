'use client';

import { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Linkedin } from 'lucide-react';

// Instagram Icon Component
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('newDesign.header');
  const nav = useTranslations('navigation');
  const params = useParams();
  const locale = params.locale as string || 'es';

  const navItems = [
    { href: `/${locale}`, label: nav('home') },
    { href: `/${locale}/nosotros`, label: nav('about') },
    { href: `/${locale}/servicios`, label: nav('services') },
    { href: `/${locale}/materiales`, label: nav('materials') },
    { href: `/${locale}/contacto`, label: nav('contact') }
  ];

  return (
    <>
      {/* Top Contact Bar */}
      <motion.div 
        className="bg-fana-primary text-white py-2 sm:py-2.5"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          {/* Mobile Layout */}
          <div className="block sm:hidden">
            <div className="flex justify-between items-center text-xs">
              <motion.div 
                className="flex items-center space-x-1.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <PhoneIcon className="w-3 h-3" />
                <span className="text-xs">{t('phone')}</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-1.5"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.a href="https://www.instagram.com/fanamillingcenter/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-all duration-200">
                  <InstagramIcon className="w-3 h-3" />
                </motion.a>
                <motion.a href="https://www.linkedin.com/company/fana-milling-center" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-all duration-200">
                  <Linkedin className="w-3 h-3 text-white" fill="white" />
                </motion.a>
              </motion.div>
            </div>
          </div>

          {/* Tablet and Desktop Layout */}
          <div className="hidden sm:block">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center space-x-4 lg:space-x-6">
                <motion.div 
                  className="flex items-center space-x-1.5"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <PhoneIcon className="w-3.5 h-3.5" />
                  <span>{t('phone')}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-1.5"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <EnvelopeIcon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{t('email')}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-1.5"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <MapPinIcon className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">{t('address')}</span>
                </motion.div>
              </div>
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.a href="https://www.instagram.com/fanamillingcenter/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200">
                  <InstagramIcon className="w-3.5 h-3.5" />
                </motion.a>
                <motion.a href="https://www.linkedin.com/company/fana-milling-center" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200">
                  <Linkedin className="w-3.5 h-3.5 text-white" fill="white" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav 
        className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm bg-white/95"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <Link href={`/${locale}`}>
              <motion.div 
                className="flex items-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative h-16 w-44 sm:h-20 sm:w-52 lg:h-24 lg:w-64">
                  <Image
                    src="/images/logo/logo-fana-1.png"
                    alt="FANA Milling Center Logo"
                    fill
                    className="object-contain"
                    priority
                    sizes="256px"
                  />
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden lg:flex items-center space-x-7"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {navItems.map((item, index) => (
                <Link key={item.href} href={item.href}>
                  <motion.span 
                    className="text-gray-700 hover:text-fana-primary font-medium text-sm transition-colors cursor-pointer relative group font-body tracking-wide"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ y: -2 }}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-fana-primary transition-all duration-300 group-hover:w-full"></span>
                  </motion.span>
                </Link>
              ))}
            </motion.div>

            {/* CTA Button & Language Switcher */}
            <motion.div 
              className="hidden lg:flex items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <LanguageSwitcher currentLocale={locale} />
              <Link href={`/${locale}/contacto`}>
                <motion.button 
                  className="bg-fana-primary text-white px-5 py-2 rounded-full hover:bg-fana-navy transition-colors font-semibold text-sm font-body tracking-wide"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('cta')}
                </motion.button>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bars3Icon className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="lg:hidden py-4 border-t overflow-visible"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div 
                  className="flex flex-col space-y-4"
                  initial="initial"
                  animate="animate"
                  variants={{
                    animate: {
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                >
                  {navItems.map((item) => (
                    <motion.div
                      key={item.href}
                      variants={{
                        initial: { opacity: 0, x: -20 },
                        animate: { opacity: 1, x: 0 }
                      }}
                    >
                      <Link 
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-gray-700 hover:text-fana-primary font-medium transition-colors block"
                      >
                        {item.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* Language Switcher Mobile */}
              <motion.div
                variants={{
                  initial: { opacity: 0, x: -20 },
                  animate: { opacity: 1, x: 0 }
                }}
                className="py-2 relative"
              >
                <LanguageSwitcher currentLocale={locale} />
              </motion.div>

              <Link href={`/${locale}/contacto`}>
                <motion.button 
                  className="bg-fana-primary text-white px-6 py-2 rounded-full hover:bg-fana-navy transition-colors font-medium w-fit"
                  variants={{
                    initial: { opacity: 0, x: -20 },
                    animate: { opacity: 1, x: 0 }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('cta')}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.nav>
</>
);
}
