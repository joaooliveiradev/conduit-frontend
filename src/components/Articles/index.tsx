import styled from 'styled-components'
import { GetArticlesOutput } from '@/hooks/queries/useGetArticles'
import { Some } from 'fp-ts/Option'
import { ArticleCard, EmptyState } from '@/components'
//eslint-disable-next-line @typescript-eslint/no-var-requires
const readingTime = require('reading-time/lib/reading-time');

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  gap: 32px 30px;
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
  return articles.value.articles.length === 0 ? (
    <EmptyState
      title="No articles are here... yet."
      message="This user hasn't written any articles yet."
    />
  ) : (
    <Wrapper>
      {articles.value.articles.map((article, index) => (
        <ArticleCard
          key={index}
          author={article.author.username}
          description={article.description}
          title={article.title}
          date={article.updatedAt}
          readingTime={getReadingTime(article.body)}
        />
      ))}
    </Wrapper>
  )
}
