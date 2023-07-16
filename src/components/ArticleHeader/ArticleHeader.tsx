import styled from 'styled-components'
import { ProfileName, ArticleStats, Divider, Anchor } from '@/components'

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

export const ArticleHeader = ({ name, readTime, date }: ArticleHeaderProps) => (
  <Wrapper>
    <Anchor href={`/profile/${name}`}>
      <ProfileName name={name} size={2} />
    </Anchor>
    <Divider />
    <ArticleStats date={date} articleBody={readTime} />
  </Wrapper>
)
