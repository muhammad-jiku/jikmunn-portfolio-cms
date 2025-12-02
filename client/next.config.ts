import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Performance Optimizations - Phase 10 */

  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
        pathname: '/**',
      },
    ],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion', '@reduxjs/toolkit'],
  },

  // Production optimizations
  reactStrictMode: true,

  // Compression
  compress: true,

  // Power bundling
  poweredByHeader: false,
};

export default nextConfig;
