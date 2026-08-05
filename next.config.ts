import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Sanity asset URLs are content-addressed (the asset id is a hash), so a
    // given URL's bytes never change and this can safely be a year. At the old
    // 60s every optimized variant expired almost immediately, forcing the
    // optimizer to re-fetch and re-transcode the origin image over and over —
    // so images were effectively always being generated cold.
    minimumCacheTTL: 31536000,
  },

  // NOTE: a custom `webpack` splitChunks override used to live here. It never ran —
  // this file was missing its `export default`, so Next silently used defaults for
  // the whole config. Once the export was restored the override took effect and
  // hoisted every node_modules package (including the 1.65MB embedded Studio) into
  // one shared chunk, taking First Load JS from 106kB to 2.26MB on every route.
  // Next's default chunking is what the site has actually been shipping. Removed.

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Performance optimizations
  reactStrictMode: true,
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['gsap', 'framer-motion', '@react-three/fiber', '@react-three/drei'],
  },

  // Headers for caching
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/models/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

