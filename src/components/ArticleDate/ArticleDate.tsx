import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import styled from 'styled-components'

export type ArticleDateProps = {
  date: string
}

const Time = styled.time`
  color: ${({ theme }) => theme.colors.black[100]};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: 600;
`

dayjs.extend(utc)
const englishFormat = 'MMM D, YYYY'

const getDate = (date: string) => {
  const articleDate = dayjs.utc(date).format(englishFormat)
  return articleDate
}

export const ArticleDate = ({ date }: ArticleDateProps) => (
  <Time>{getDate(date)}</Time>
)
