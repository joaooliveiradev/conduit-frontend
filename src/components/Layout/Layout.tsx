import styled, { css } from 'styled-components'
import { Header, Footer, type ToastProps } from '@/components'
import type { ReactNode } from 'react'
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
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: ${theme.spacings.xxhuge} ${theme.spacings.xxxxhuge};
  `}
`

const Main = styled.main`
  height: 100%;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacings.xxxhuge};
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
          <Main>{children}</Main>
          <Footer />
        </Wrapper>
      </Hydrate>
    </QueryClientProvider>
  )
}
