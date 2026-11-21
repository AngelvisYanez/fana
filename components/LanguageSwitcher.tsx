'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

interface LanguageSwitcherProps {
  currentLocale: string;
  /** Open the list above the button (for buttons at the bottom of a panel). */
  dropUp?: boolean;
}

export default function LanguageSwitcher({ currentLocale, dropUp = false }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' }
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  const handleLanguageChange = (locale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    const newPath = `/${locale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-fana-secondary0 hover:bg-fana-secondary transition-all duration-200"
        aria-label="Change language"
      >
        <GlobeAltIcon className="h-4 w-4 text-gray-600" />
        <span className="font-semibold text-gray-700 text-sm">{currentLanguage.code.toUpperCase()}</span>
        <svg
          className={`h-3 w-3 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 w-40 bg-white rounded-lg shadow-xl border border-gray-200 z-[9999] overflow-hidden ${
            dropUp ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-none bg-white hover:bg-fana-secondary transition-colors duration-200 ${
                currentLocale === language.code ? 'text-fana-primary' : ''
              }`}
            >
              <span className="inline-flex h-6 w-7 items-center justify-center rounded bg-gray-100 text-[11px] font-bold text-gray-700">
                {language.code.toUpperCase()}
              </span>
              <span className="font-medium text-gray-800 text-sm">{language.name}</span>
              {currentLocale === language.code && (
                <svg className="h-4 w-4 text-fana-primary ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
