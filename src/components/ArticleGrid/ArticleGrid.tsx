import styled, { css } from 'styled-components'

export type ArticleGridProps = {
  children: React.ReactNode
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacings.large};
  `}
`

export const ArticleGrid = ({ children }: ArticleGridProps) => (
  <Wrapper>{children}</Wrapper>
)
