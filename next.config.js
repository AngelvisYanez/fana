const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para desarrollo local - sin basePath
  // basePath: '/demo',
  // assetPrefix: '/demo',
  
  // Optimización para deployment en cPanel con memoria limitada
  // Remover 'standalone' para reducir uso de memoria
  experimental: {
    esmExternals: 'loose',
    optimizePackageImports: ['framer-motion', '@heroicons/react', 'lucide-react'],
    // Reducir workers para limitar uso de memoria
    workerThreads: false,
    cpus: 1
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Deshabilitar swcMinify para reducir uso de memoria durante runtime
  swcMinify: false,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Reducir opciones de imágenes para menor uso de memoria
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 1080, 1920],
    imageSizes: [16, 32, 64, 128, 256],
  },
  // Optimizaciones adicionales para memoria
  productionBrowserSourceMaps: false,
  optimizeFonts: false,
};

module.exports = withNextIntl(nextConfig);
