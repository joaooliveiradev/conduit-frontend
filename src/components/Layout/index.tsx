import { Header, Footer } from '@/components'
import styled, { css } from 'styled-components'
import * as React from 'react'
import { useToast } from '@/context/toast'

import dynamic from 'next/dynamic'

const Toast = dynamic(() => import('@/components/Toast'), {
  ssr: false,
})

export type LayoutProps = {
  children: React.ReactNode
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

export const Layout = ({ children }: LayoutProps) => {
  const { isToastOpen, setIsToastOpen } = useToast()
  return (
    <>
      <Wrapper>
        <Header />
        <main>{children}</main>
        <Footer />
      </Wrapper>
      <Toast
        title="Unknown Error"
        description="You have been logged out due to some unknown error."
        open={isToastOpen}
        onOpenChange={setIsToastOpen}
      />
    </>
  )
}
