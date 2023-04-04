import styled, { css } from 'styled-components'

export type ArticleGridProps = {
  children: React.ReactNode
}

const Wrapper = styled.section`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: center;
    gap: ${theme.spacings.large};
  `}
`

export const ArticleGrid = ({ children }: ArticleGridProps) => (
  <Wrapper role="feed" aria-labelledby="accessible-list-articles">{children}</Wrapper>
)
