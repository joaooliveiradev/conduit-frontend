import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from '@tanstack/react-query'
import { useState } from 'react'
import { Layout } from '@components/Layout'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from '@/styles/global'
import theme from '@/styles/theme'
import { AuthProvider } from '@context/auth'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
