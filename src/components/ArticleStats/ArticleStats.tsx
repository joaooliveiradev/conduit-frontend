import { ArticleReadingTime, Divider, ArticleDate } from '@/components'
import styled from 'styled-components'

export type ArticleStatsProps = {
  articleBody: string
  date: string
}

const Wrapper = styled.div`
  display: flex;
  column-gap: ${({ theme }) => theme.spacings.xsmall};
`

export const ArticleStats = ({ articleBody, date }: ArticleStatsProps) => (
  <Wrapper>
    <ArticleReadingTime articleBody={articleBody} />
    <Divider />
    <ArticleDate date={date} />
  </Wrapper>
)
