/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app/styles')],
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
