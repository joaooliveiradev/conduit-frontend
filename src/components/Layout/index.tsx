import { Header, Footer } from '@/components'
import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

export type LayoutProps = {
  children: ReactNode
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    max-width: ${theme.breakpoints.desktop}
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    margin: 0px auto;
    @media (max-width: ${theme.breakpoints.desktop}) {
      padding: 0px 124px;
    }
  `}
`

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Wrapper>
      <Header />
      <main>{children}</main>
      <Footer />
    </Wrapper>
  )
}
