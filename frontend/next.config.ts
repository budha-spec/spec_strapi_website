import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  allowedDevOrigins: ['10.37.55.113'],
  experimental: {
    /*
     * Ship the (single, ~16 KB gzipped) stylesheet inside the HTML as a
     * <style> tag instead of a <link>. Removes the HTML → CSS request chain
     * Lighthouse flags as render-blocking, so first paint / LCP only waits
     * for the document. Production builds only; dev is unchanged.
     */
    inlineCss: true,
  },
};

export default nextConfig;
