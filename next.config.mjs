/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer'

const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    child-src 'none';
    style-src 'self' 'unsafe-inline';
    img-src * blob: data:;
    media-src 'none';
    font-src 'self';
    connect-src *;
`

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Controls',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
]

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  webpack: (config) => {
    const svgrConfig = {
      test: /\.svg$/,
      use: ['@svgr/webpack', 'file-loader'],
      issuer: /\.(ts|tsx|js|jsx|md|mdx)$/,
    }
    const treeshakingConfig = {
      test: /index\.(js|mjs|jsx|ts|tsx)$/,
      sideEffects: false,
    }

    config.module.rules.push(svgrConfig, treeshakingConfig)
    return config
  },
}

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig)
