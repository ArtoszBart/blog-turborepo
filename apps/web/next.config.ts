import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  turbopack: {
    rules: {
      '*.gql': {
        loaders: ['graphql-tag/loader'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
