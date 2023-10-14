const { i18n } = require('./next-i18next.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io']
  },
  i18n,
  webpack: (config, { isServer }) => {
    if (!isServer && process.env.ANALYZE === 'true') {
      config.plugins.push(new BundleAnalyzerPlugin());
    }
  
    return config;
  },
};

module.exports = nextConfig;
