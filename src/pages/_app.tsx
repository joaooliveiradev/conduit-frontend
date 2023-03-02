import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from '@tanstack/react-query'
import { Layout } from '@/components'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from '@/styles'
import { AuthProvider, ToastProvider } from '@/context'
import { type DefaultSeoProps, DefaultSeo } from 'next-seo'
import React from 'react'
import * as superJSON from 'superjson'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const SEO: DefaultSeoProps = {
  title: 'Conduit - A place to read and share your ideias.',
  description:
    "Conduit is a platform where readers and writers can discover, create and share ideas, topics they're passionate about.",
  openGraph: {
    type: 'website',
    url: baseURL,
    siteName: 'Conduit',
    locale: 'en_US',
    title: 'Conduit - A place to read and share your ideias.',
    description:
      "Conduit is a platform where readers and writers can discover, create and share ideas, topics they're passionate about.",
    images: [
      {
        url: `${baseURL}/cover.png`,
        alt: 'Og Conduit Image',
        type: 'image/png',
        width: 600,
        height: 200,
      },
    ],
  },
  additionalMetaTags: [
    {
      property: 'dc:creator',
      content: 'João Oliveira',
    },
    {
      property: 'application-name',
      content: 'Conduit',
    },
  ],
}

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())
  const hydratedState = pageProps.dehydratedState
    ? superJSON.parse(pageProps.dehydratedState)
    : null

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={hydratedState}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <AuthProvider>
            <ToastProvider>
              <Layout>
                <DefaultSeo {...SEO} />
                <Component {...pageProps} />
              </Layout>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
