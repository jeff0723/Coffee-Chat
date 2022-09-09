/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})
const runtimeCaching = require("next-pwa/cache");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/]
  },
}
module.exports = withPWA(nextConfig)
