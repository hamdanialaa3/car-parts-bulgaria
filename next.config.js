/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'images.unsplash.com',
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Mobile.de inspired configurations
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  // Custom port configuration
  env: {
    CUSTOM_PORT: '3001',
    PROJECT_NAME: 'Car Parts Bulgaria',
  },
};

module.exports = withNextIntl(nextConfig);