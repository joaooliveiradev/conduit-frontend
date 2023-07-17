import { type ReactNode } from 'react'
import styled from 'styled-components'

export type ArticleStatsProps = {
  children: ReactNode
}

const Wrapper = styled.div`
  display: flex;
  column-gap: ${({ theme }) => theme.spacings.xsmall};
`

export const ArticleStats = ({ children }: ArticleStatsProps) => (
  <Wrapper>{children}</Wrapper>
)
