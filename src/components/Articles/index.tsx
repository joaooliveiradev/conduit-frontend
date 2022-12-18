import styled, { css } from 'styled-components'
import { GetArticlesOutput } from '@/hooks/queries/useGetArticles'
import { Some } from 'fp-ts/Option'
import { ArticleCard, EmptyState } from '@/components'
import format from 'date-fns/format'
//eslint-disable-next-line @typescript-eslint/no-var-requires
const readingTime = require('reading-time/lib/reading-time')

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacings.large};
  `}
`

type ArticlesProps = {
  articles: Some<GetArticlesOutput>
}

export const Articles = ({ articles }: ArticlesProps) => {
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

  if (articles.value.articles.length === 0) {
    return (
      <EmptyState
        title="No articles are here... yet."
        message="This user hasn't written any articles yet."
      />
    )
  } else {
    return (
      <Wrapper>
        {articles.value.articles.map((article, index) => (
          <ArticleCard
            key={index}
            author={article.author.username}
            description={article.description}
            title={article.title}
            date={getDate(article.updatedAt)}
            readingTime={getReadingTime(article.body)}
          />
        ))}
      </Wrapper>
    )
  }
}
