import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import { Anchor } from '@/components/Anchor/Anchor'

export type ArticleCardProps = {
  children: React.ReactNode
}

export const Wrapper = styled.article`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${transparentize(0.9, theme.colors.black[100])};
    border-radius: 2px;
    padding: ${theme.spacings.large};
    row-gap: ${theme.spacings.xxsmall};
    transition: background-color 250ms ease-in;
    user-select: none;
    :hover {
      background-color: ${transparentize(0.86, theme.colors.black[100])};
    }
  `}
`

export const ArticleCard = ({ children }: ArticleCardProps) => (
  <Wrapper>{children}</Wrapper>
)

ArticleCard.Main = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacings.small};
  `}
`

ArticleCard.Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xlarge};
    line-height: 29px;
    letter-spacing: -0.04em;
  `}
`

ArticleCard.Text = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.medium};
    line-height: 21px;
    letter-spacing: -0.01em;
    color: ${theme.colors.grey[200]};
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`

ArticleCard.Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

ArticleCard.Anchor = Anchor
