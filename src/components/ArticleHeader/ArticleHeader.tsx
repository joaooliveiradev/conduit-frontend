import styled from 'styled-components'
import { ProfileName, ArticleStats, Divider } from '@/components/'

export type ArticleHeaderProps = {
  name: string
  readTime: string
  date: string
}

const Wrapper = styled.header`
  display: flex;
  column-gap: 12px;
  align-items: center;
`

export const ArticleHeader = ({
  name,
  readTime,
  date,
}: ArticleHeaderProps) => (
  <Wrapper>
    <ProfileName name={name} size={2} />
    <Divider />
    <ArticleStats date={date} readTime={readTime} />
  </Wrapper>
)
