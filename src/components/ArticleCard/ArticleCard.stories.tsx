import type { Meta, Story } from '@storybook/react'
import { ProfileName, ArticleStats, ArticleCard, type ArticleCardProps } from '@/components'

const stories: Meta<ArticleCardProps> = {
  component: ArticleCard,
}

const mock = {
  slug: 'toward-a-journalistic-ethic-of-citation',
  title: 'Toward a Journalistic Ethic of Citation',
  author: 'Jeff Jarvis',
  date: 'May 26, 2022',
  readTime: '3min',
  description:
    'After The New York Times published its extensive report on the history of Haiti’s impoverishment at the hands.',
}

export const Default: Story<ArticleCardProps> = () => (
  <ArticleCard>
    <ArticleCard.Anchor href={`/article/${mock.slug}`}>
      <ArticleCard.Main>
        <header>
          <ArticleCard.Title>{mock.title}</ArticleCard.Title>
        </header>
        <section>
          <ArticleCard.Text>{mock.description}</ArticleCard.Text>
        </section>
      </ArticleCard.Main>
    </ArticleCard.Anchor>
    <ArticleCard.Footer>
      <ArticleCard.Anchor href={`/profile/${mock.author}`}>
        <ProfileName name={mock.author} size={2} />
      </ArticleCard.Anchor>
      <ArticleStats date={mock.date} readTime={mock.readTime} />
    </ArticleCard.Footer>
  </ArticleCard>
)

export default stories
