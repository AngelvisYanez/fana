'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
}

/**
 * Editorial section heading shared by the home sections:
 * small "Label /" eyebrow, uppercase serif title, optional description.
 */
export default function SectionHeading({
  label,
  title,
  description,
  align = 'center',
  tone = 'dark',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center';
  const titleColor = tone === 'light' ? 'text-white' : 'text-fana-navy';
  const mutedColor = tone === 'light' ? 'text-blue-100' : 'text-gray-600';
  const labelColor = tone === 'light' ? 'text-blue-200' : 'text-gray-500';

  return (
    <motion.div
      className={`${centered ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <p className={`mb-4 sm:mb-5 text-xs sm:text-sm font-medium ${labelColor}`}>{label} /</p>
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-normal uppercase !leading-[1.2] tracking-normal ${titleColor}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 sm:mt-6 text-base sm:text-lg ${mutedColor} ${centered ? 'mx-auto' : ''} max-w-2xl`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
