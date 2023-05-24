import { Layout } from '@/components'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from '@/styles'
import { AuthProvider } from '@/context'
import { parse as superJsonParse } from 'superjson'
import { DefaultSeo, type DefaultSeoProps } from 'next-seo'
import { baseWebUrl } from '@/types'

export const defaultSEO: DefaultSeoProps = {
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
      property: 'application-name',
      content: 'Conduit',
    },
  ],
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const hydratedState = pageProps.dehydratedState
    ? superJsonParse(pageProps.dehydratedState)
    : null

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout hydratedState={hydratedState}>
          <DefaultSeo {...defaultSEO} />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
