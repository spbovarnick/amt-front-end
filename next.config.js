/** @type {import('next').NextConfig} */
const { hostname } = require('os');
const path = require('path');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'amt-admin-727b777103da.herokuapp.com'
      },
      {
        protocol: 'https',
        hostname: 'world-arts-prod.s3.us-west-2.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: 'amt-staging-445296212188.us-west-2.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: 'd3qyzflaqh7cpk.cloudfront.net'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000'
      }
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app/styles')],
  },
};

module.exports = nextConfig;
