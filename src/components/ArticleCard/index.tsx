import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import { ProfileName } from '@/components'

export type ArticleCardProps = {
  title: string
  description: string
  date: string
  readingTime: string
  author: string
}

const Wrapper = styled.article`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${transparentize(0.9, theme.colors.black[100])};
    border-radius: 2px;
    padding: ${theme.spacings.large};
    row-gap: ${theme.spacings.small};
    transition: background-color 250ms ease-in;
    padding: ${theme.spacings.large};
    :hover {
      background-color: ${transparentize(0.86, theme.colors.black[100])};
    }
  `}
`

const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xlarge};
  `}
`

const Text = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xmedium};
    color: ${theme.colors.grey[200]};
  `}
`

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
`

const InfoWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    column-gap: ${theme.spacings.xsmall};
    align-items: center;
  `}
`

const InfoText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.black[100]};
    font-size: ${theme.fonts.sizes.medium};
    font-weight: 600;
  `}
`

const Divider = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.grey[300]};
    font-size: ${theme.fonts.sizes.medium};
  `}
`

export const ArticleCard = ({
  title,
  description,
  date,
  readingTime,
  author,
}: ArticleCardProps) => {
  return (
    <Wrapper>
      <header>
        <Title>{title}</Title>
      </header>
      <section>
        <Text>{description}</Text>
      </section>
      <Footer>
        <ProfileName name={author} size={2} />
        <InfoWrapper>
          <InfoText>{readingTime}</InfoText>
          <Divider>{`//`}</Divider>
          <InfoText>{date}</InfoText>
        </InfoWrapper>
      </Footer>
    </Wrapper>
  )
}
