/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.winudf.com','lh3.googleusercontent.com' ],
  }
}

module.exports = nextConfig
