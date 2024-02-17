/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'firebasestorage.googleapis.com'],
  },
};

module.exports = nextConfig;
