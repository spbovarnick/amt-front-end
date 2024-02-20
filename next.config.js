/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app/styles')],
  },
  images: {
    unoptimized: true,
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
        protocol: 'http',
        hostname: '',
        port: '3000'
      }
    ]
  }
};

module.exports = nextConfig;
