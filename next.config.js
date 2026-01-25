/** @type {import('next').NextConfig} */

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: apiBaseUrl,
  },
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: `${apiBaseUrl}/docs`,
      },
      {
        source: '/openapi.json',
        destination: `${apiBaseUrl}/openapi.json`,
      },
    ];
  },
};

module.exports = nextConfig;
