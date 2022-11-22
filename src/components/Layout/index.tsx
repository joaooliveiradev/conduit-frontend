import { Header, Footer } from '@/components'
import { ReactNode } from 'react'
import styled from 'styled-components'

export type LayoutProps = {
  children: ReactNode
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  height: calc(100vh - 40px);
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  margin: 0 auto;
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
