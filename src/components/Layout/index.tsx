import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { ReactNode } from 'react'
import styled from 'styled-components'

export type LayoutProps = {
  children: ReactNode
}

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  padding: 70px 120px;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  @media (max-width: 1440px) {
    padding: 70px 40px;
  }
`

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Wrapper>
      <Header isUserLoggedIn />
      <main>{children}</main>
      <Footer />
    </Wrapper>
  )
}
