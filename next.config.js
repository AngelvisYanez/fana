const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', '@heroicons/react', 'lucide-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 1080, 1920],
    imageSizes: [16, 32, 64, 128, 256],
  },
  // Optimizaciones para Vercel
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
};

module.exports = withNextIntl(nextConfig);
