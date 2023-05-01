import { Divider } from '@/components'
import styled from 'styled-components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
//eslint-disable-next-line @typescript-eslint/no-var-requires
const readingTime = require('reading-time/lib/reading-time')

export type ArticleStatsProps = {
  readTime: string
  date: string
}

const Wrapper = styled.div`
  display: flex;
  column-gap: ${({ theme }) => theme.spacings.xsmall};
`

const Text = styled.p`
  color: ${({ theme }) => theme.colors.black[100]};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: 600;
`

const DateTime = styled.time`
  color: ${({ theme }) => theme.colors.black[100]};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: 600;
`

export const ArticleStats = ({ readTime, date }: ArticleStatsProps) => {
  const getReadingTime = (articleBody: string) => {
    const stats = readingTime(articleBody)
    const minute = stats.text.charAt(0)
    return `${minute}min`
  }

  const getDate = (articleDate: string) => {
    dayjs.extend(utc)
    const englishFormat = 'MMM D, YYYY'
    const date = dayjs.utc(articleDate).format(englishFormat)
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
