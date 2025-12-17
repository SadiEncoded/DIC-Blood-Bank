/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['localhost', 'i.pravatar.cc', 'images.unsplash.com'],
  },
};

module.exports = nextConfig;
