import type { Meta, Story } from '@storybook/react'
import {
  ArticleCard,
  ArticleGrid,
  ArticleStats,
  ProfileName,
  type ArticleGridProps,
} from '@/components'
import styled from 'styled-components'

const stories: Meta<ArticleGridProps> = {
  component: ArticleGrid,
}

export default stories

const articles = [
  {
    slug: 'bla-foo-1',
    title: 'Bla Foo 1',
    author: 'Jeff Jarvis',
    date: 'May 26, 2022',
    readTime: '3min',
    description:
      'After The New York Times published its extensive report on the history of Haiti’s impoverishment at the hands.',
  },
  {
    slug: 'bla-foo-2',
    title: 'Bla Foo 2',
    author: 'Jeff Jarvis',
    date: 'May 26, 2022',
    readTime: '3min',
    description:
      'After The New York Times published its extensive report on the history of Haiti’s impoverishment at the hands.',
  },
  {
    slug: 'bla-foo-3',
    title: 'Bla Foo 3',
    author: 'Jeff Jarvis',
    date: 'May 26, 2022',
    readTime: '3min',
    description:
      'After The New York Times published its extensive report on the history of Haiti’s impoverishment at the hands.',
  },
  {
    slug: 'bla-foo-4',
    title: 'Bla Foo 4',
    author: 'Jeff Jarvis',
    date: 'May 26, 2022',
    readTime: '3min',
    description:
      'After The New York Times published its extensive report on the history of Haiti’s impoverishment at the hands.',
  },
  {
    slug: 'bla-foo-5',
    title: 'Bla Foo 5',
    author: 'Jeff Jarvis',
    date: 'May 26, 2022',
    readTime: '3min',
    description:
      'After The New York Times published its extensive report on the history of Haiti’s impoverishment at the hands.',
  },
]

const MockComponent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Default: Story<ArticleGridProps> = () => (
  <MockComponent>
    <ArticleGrid>
      {articles.map((article) => (
        <ArticleCard key={article.slug}>
          <ArticleCard.Anchor href={`/article/${article.slug}`}>
            <ArticleCard.Main>
              <header>
                <ArticleCard.Title>{article.title}</ArticleCard.Title>
              </header>
              <section>
                <ArticleCard.Text>{article.description}</ArticleCard.Text>
              </section>
            </ArticleCard.Main>
          </ArticleCard.Anchor>
          <ArticleCard.Footer>
            <ArticleCard.Anchor href={`/profile/${article.author}`}>
              <ProfileName name={article.author} size={2} />
            </ArticleCard.Anchor>
            <ArticleStats date={article.date} readTime={article.readTime} />
          </ArticleCard.Footer>
        </ArticleCard>
      ))}
    </ArticleGrid>
  </MockComponent>
)
