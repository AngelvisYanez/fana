'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
}

/**
 * Editorial section heading shared by the home sections:
 * uppercase serif title with an optional description.
 */
export default function SectionHeading({
  title,
  description,
  align = 'center',
  tone = 'dark',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center';
  const titleColor = tone === 'light' ? 'text-white' : 'text-fana-navy';
  const mutedColor = tone === 'light' ? 'text-blue-100' : 'text-gray-600';

  return (
    <motion.div
      className={`${centered ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
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
