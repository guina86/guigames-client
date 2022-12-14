/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = withPWA({
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
    reactRemoveProperties: true //true to remove data-testid in production
  },
  pwa: {
    dest: 'public',
    disable: !isProd
  },
  images: {
    domains: ['localhost', 'res.cloudinary.com']
  }
})

module.exports = nextConfig
