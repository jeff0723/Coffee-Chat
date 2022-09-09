/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    register: true,
    skipWaiting: true,
  },
}


module.exports = withPWA(nextConfig)
