/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer'

const isProduction = process.env.NODE_ENV === 'production'

// TODO: Add report-onlyy and report-uri when have some monitoring software.

const ContentSecurityPolicy = `
  base-uri 'self';
  frame-ancestors 'none';
  form-action 'none';
  script-src 'self' ${isProduction ? '' : "'unsafe-eval'"};
  worker-src 'none';
  object-src 'none';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  frame-src 'none';
  child-src 'none';
  img-src 'self' data:;
  connect-src 'self' https://conduit-api.fly.dev;
  font-src 'self' https://fonts.gstatic.com;
  media-src 'none';
  manifest-src 'none';
  default-src 'none';
  upgrade-insecure-requests;
`

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'X-DNS-Prefetch-Controls',
    value: 'on',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'same-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
]

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
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
