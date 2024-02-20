/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'amt-admin-727b777103da.herokuapp.com',
      //   port: '',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'world-arts-prod.s3.us-west-2.amazonaws.com',
      //   port: '',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'd3qyzflaqh7cpk.cloudfront.net',
      //   port: '',
      // },
      // {
      //   protocol: 'http',
      //   hostname: '',
      //   port: '3000',
      // },
      {
        protocol: 'https',
        hostname: '**',
      }
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app/styles')],
  },
};

module.exports = nextConfig;
