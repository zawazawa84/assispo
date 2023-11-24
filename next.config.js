/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    experimental: {
      appDir: true,
    },
    output: 'export',
  },
};

module.exports = nextConfig;
