import styled from 'styled-components'

export type ArticleGridProps = {
  children: React.ReactNode
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacings.large};
`

export const ArticleGrid = ({ children }: ArticleGridProps) => (
  <Wrapper role="feed" aria-labelledby="accessible-list-articles">
    {children}
  </Wrapper>
)
