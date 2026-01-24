/** @type {import('next').NextConfig} */
import { hostname } from 'os';
import { join } from 'path';

const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: true, // Only for private networks,
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
        protocol: 'https',
        hostname: 'd1wllgx6trucp.cloudfront.net'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000'
      }
    ]
  },
  sassOptions: {
    includePaths: [join(__dirname, 'src/app/styles')],
  },
};

export default nextConfig;
