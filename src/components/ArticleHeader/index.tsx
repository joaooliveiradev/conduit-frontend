import styled from 'styled-components'
import { ProfileName, ArticleStats, Divider } from '@/components/'

export type ArticleHeaderProps = {
  name: string
  readingTime: string
  date: string
}

const Wrapper = styled.div`
  display: flex;
  column-gap: 12px;
  align-items: center;
`

export const ArticleHeader = ({
  name,
  readingTime,
  date,
}: ArticleHeaderProps) => (
  <Wrapper>
    <ProfileName name={name} size={2} />
    <Divider />
    <ArticleStats date={date} readingTime={readingTime} />
  </Wrapper>
)
