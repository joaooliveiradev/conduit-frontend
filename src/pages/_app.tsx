import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from '@tanstack/react-query'
import * as React from 'react'
import { Layout } from '@/components'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from '@/styles'
import { AuthProvider } from '@/context'
import { ToastProvider } from '@/context/toast'
import * as superJSON from 'superjson'

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
