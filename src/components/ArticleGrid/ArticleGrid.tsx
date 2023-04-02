import styled, { css } from 'styled-components'

export type ArticleGridProps = {
  children: React.ReactNode
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    --cardMaxWidth: 480px;
    display: grid;
    grid-template-columns: repeat(2, var(--cardMaxWidth));
    align-items: center;
    justify-content: center;
    gap: ${theme.spacings.large};
  `}
`

export const ArticleGrid = ({ children }: ArticleGridProps) => (
  <Wrapper>{children}</Wrapper>
)
