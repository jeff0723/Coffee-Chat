/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})
const runtimeCaching = require('next-pwa/cache')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    runtimeCaching
  }
}


module.exports = withPWA(nextConfig)
