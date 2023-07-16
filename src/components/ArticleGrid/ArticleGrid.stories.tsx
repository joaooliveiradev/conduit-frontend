import type { Meta, StoryObj } from '@storybook/react'
import {
  ArticleCard,
  ArticleGrid,
  ArticleStats,
  ProfileName,
  type ArticleGridProps,
} from '@/components'

const meta: Meta<ArticleGridProps> = {
  component: ArticleGrid,
}

export default meta

const articles = [
  {
    slug: 'bla-foo-1',
    title: 'Bla Foo 1',
    author: 'Jeff Jarvis',
    date: 'May 26, 2022',
    readTime: '3min',
    description:
      'After The New York Times published its extensive report on the history of Haiti’s impoverishment at the hands.',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  },
  {
    slug: 'bla-foo-2',
    title: 'Bla Foo 2',
    author: 'Jeff Jarvis',
    date: 'May 26, 2022',
    readTime: '3min',
    description:
      'After The New York Times published its extensive report on the history of Haiti’s impoverishment at the hands.',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  },
  {
    slug: 'bla-foo-3',
    title: 'Bla Foo 3',
    author: 'Jeff Jarvis',
    date: 'May 26, 2022',
    readTime: '3min',
    description:
      'After The New York Times published its extensive report on the history of Haiti’s impoverishment at the hands.',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  },
  {
    slug: 'bla-foo-4',
    title: 'Bla Foo 4',
    author: 'Jeff Jarvis',
    date: 'May 26, 2022',
    readTime: '3min',
    description:
      'After The New York Times published its extensive report on the history of Haiti’s impoverishment at the hands.',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  },
  {
    slug: 'bla-foo-5',
    title: 'Bla Foo 5',
    author: 'Jeff Jarvis',
    date: 'May 26, 2022',
    description:
      'After The New York Times published its extensive report on the history of Haiti’s impoverishment at the hands.',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  },
]

export const Default: StoryObj<ArticleGridProps> = {
  render: () => (
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
            <ArticleStats date={article.date} articleBody={article.body} />
          </ArticleCard.Footer>
        </ArticleCard>
      ))}
    </ArticleGrid>
  ),
}
