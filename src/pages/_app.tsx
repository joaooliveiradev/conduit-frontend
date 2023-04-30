import { Layout } from '@/components'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from '@/styles'
import { AuthProvider } from '@/context'
import { type DefaultSeoProps, DefaultSeo } from 'next-seo'
import { baseWebUrl } from '@/types'
import { parse as superJsonParse } from 'superjson'

const SEO: DefaultSeoProps = {
  title: 'Conduit - A place to read and share your ideias.',
  description:
    "Conduit is a platform where readers and writers can discover, create and share ideas, topics they're passionate about.",
  openGraph: {
    type: 'website',
    url: baseWebUrl,
    siteName: 'Conduit',
    locale: 'en_US',
    title: 'Conduit - A place to read and share your ideias.',
    description:
      "Conduit is a platform where readers and writers can discover, create and share ideas, topics they're passionate about.",
    images: [
      {
        url: `${baseWebUrl}/cover.png`,
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
  const hydratedState = pageProps.dehydratedState
    ? superJsonParse(pageProps.dehydratedState)
    : null

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout hydratedState={hydratedState}>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
