/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer'

const ContentSecurityPolicy = `
    default-src 'self' https://*.fly.dev;
    script-src 'self' 'unsafe-inline';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data:;
    form-action 'none';
    frame-ancestors 'none'
    child-src 'none'
    media-src 'none'
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
