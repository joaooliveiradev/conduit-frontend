/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'file-loader'],
      issuer: /\.(ts|tsx|js|jsx|md|mdx)$/,
    })
    return config
  },
}

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig)
