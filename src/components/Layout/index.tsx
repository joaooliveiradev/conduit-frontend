import { Header, Footer } from '@/components'
import { ReactNode } from 'react'
import styled from 'styled-components'

export type LayoutProps = {
  children: ReactNode
}

const Wrapper = styled.div`
  max-width: 1440px;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  margin: 0 auto;
  padding: 72px 0px;
  @media (max-width: 1440px){
    padding: 72px 124px;
  }
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
