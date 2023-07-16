import styled from 'styled-components'

//eslint-disable-next-line @typescript-eslint/no-var-requires
const readingTime = require('reading-time/lib/reading-time')

export type ArticleReadingTimeProps = {
  articleBody: string
}

const Text = styled.p`
  color: ${({ theme }) => theme.colors.black[100]};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: 600;
`

const getReadingTime = (articleBody: string) => {
  const stats = readingTime(articleBody)
  const minute = stats.text.charAt(0)
  return `${minute}min`
}

export const ArticleReadingTime = ({
  articleBody,
}: ArticleReadingTimeProps) => <Text>{getReadingTime(articleBody)}</Text>
