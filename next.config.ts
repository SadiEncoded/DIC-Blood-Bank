/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow network access for mobile testing
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '192.168.0.102:3000', '192.168.0.106:3000', '192.168.1.102:3000', '192.168.1.106:3000'] 
    }
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'localhost' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ],
  },
};

export default nextConfig;
