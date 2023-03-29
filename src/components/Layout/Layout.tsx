import styled, { css } from 'styled-components'
import { Header, Footer, type ToastProps } from '@/components'
import { type ReactNode } from 'react'
import {
  Hydrate,
  QueryCache,
  QueryClient,
  type QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useAuth } from '@/context'
import { AuthorizationError } from '@/libs'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const Toast = dynamic<ToastProps>(
  () => import('@/components/Toast/Toast').then((module) => module.Toast),
  {
    ssr: false,
  }
)

export type LayoutProps = {
  children: ReactNode
  hydratedState: unknown
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    max-width: ${theme.breakpoints.desktop};
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    margin: 0px auto;
    @media (max-width: ${theme.breakpoints.desktop}) {
      padding: 0px ${theme.spacings.xxxxhuge};
    }
  `}
`

const threeSeconds = 3000

export const Layout = ({ children, hydratedState }: LayoutProps) => {
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false)
  const { signOut } = useAuth()

  const handleQueryErrors = (error: unknown) => {
    if (error instanceof AuthorizationError) {
      signOut()
      setIsToastOpen(true)
    }
  }

  const queryClientConfig: QueryClientConfig = {
    queryCache: new QueryCache({
      onError: (errors) => handleQueryErrors(errors),
    }),
  }

  const [queryClient] = useState(() => new QueryClient(queryClientConfig))

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={hydratedState}>
        <Wrapper>
          <Toast
            label="Notification Error"
            title="Session Expired!"
            description="We're sorry, but your session has expired or your token is invalid. Please sign in again to continue."
            open={isToastOpen}
            onOpenChange={setIsToastOpen}
            duration={threeSeconds}
            type="foreground"
          />
          <Header />
          <main>{children}</main>
          <Footer />
        </Wrapper>
      </Hydrate>
    </QueryClientProvider>
  )
}
