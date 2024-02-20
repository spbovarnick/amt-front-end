/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'amt-admin-727b777103da.herokuapp.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'world-arts-prod.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'd3qyzflaqh7cpk.cloudfront.net',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: '',
        port: '3000',
        pathname: '/**'
      }
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app/styles')],
  },
};

module.exports = nextConfig;
