import styled, { css } from 'styled-components'
import type { GetArticlesOutput } from '@/hooks/queries'
import type { Some } from 'fp-ts/Option'
import { ArticleCard, EmptyState } from '@/components'

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacings.large};
  `}
`

export type ArticlesProps = {
  articles: Some<GetArticlesOutput>
}

export const Articles = ({ articles }: ArticlesProps) => {
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
            date={article.updatedAt}
            readTime={article.body}
            slug={article.slug}
          />
        ))}
      </Wrapper>
    )
  }
}
