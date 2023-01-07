import { Divider } from '@/components'
import styled, { css } from 'styled-components'
import format from 'date-fns/format'
//eslint-disable-next-line @typescript-eslint/no-var-requires
const readingTime = require('reading-time/lib/reading-time')

export type ArticleStatsProps = {
  readTime: string
  date: string
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    column-gap: ${theme.spacings.xsmall};
  `}
`

const Text = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.black[100]};
    font-size: ${theme.fonts.sizes.medium};
    font-weight: 600;
  `}
`

const DateTime = styled.time`
  ${({ theme }) => css`
    color: ${theme.colors.black[100]};
    font-size: ${theme.fonts.sizes.medium};
    font-weight: 600;
  `}
`

export const ArticleStats = ({ readTime, date }: ArticleStatsProps) => {
  const getReadingTime = (articleBody: string) => {
    const stats = readingTime(articleBody)
    const minute = stats.text.charAt(0)
    return `${minute}min`
  }

  const getDate = (articleDate: string) => {
    const formatMethod = 'PP'
    const date = format(new Date(articleDate), formatMethod)
    return date
  }

  return (
    <Wrapper>
      <Text>{getReadingTime(readTime)}</Text>
      <Divider />
      <DateTime>{getDate(date)}</DateTime>
    </Wrapper>
  )
}
