import { Divider } from '@/components'
import styled, { css } from 'styled-components'

type ArticleStatsProps = {
  readingTime: string
  date: string
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    column-gap: ${theme.spacings.xsmall};
  `}
`

const InfoText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.black[100]};
    font-size: ${theme.fonts.sizes.medium};
    font-weight: 600;
  `}
`

export const ArticleStats = ({ readingTime, date }: ArticleStatsProps) => {
  return (
    <Wrapper>
      <InfoText>{readingTime}</InfoText>
      <Divider />
      <InfoText>{date}</InfoText>
    </Wrapper>
  )
}
