/** @type {import('next').NextConfig} */
const cmsPath =
  process?.env?.NEXT_PUBLIC_CMS_URL === undefined
    ? '/'
    : process?.env?.NEXT_PUBLIC_CMS_URL.replace(/^https?:\/\//, '');
const nextConfig = {
  images: {
    domains: [cmsPath],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true,
  },
      // trailingSlash: true,
}


module.exports = nextConfig
