import type { Meta, StoryObj } from '@storybook/react'
import {
  type ArticleCardProps,
  ProfileName,
  ArticleStats,
  ArticleCard,
  ArticleReadingTime,
  Divider,
  ArticleDate,
} from '@/components'

const meta: Meta<ArticleCardProps> = {
  component: ArticleCard,
}

export default meta

const mock = {
  slug: 'toward-a-journalistic-ethic-of-citation',
  title: 'Toward a Journalistic Ethic of Citation',
  author: 'Jeff Jarvis',
  date: 'May 26, 2022',
  description:
    'After The New York Times published its extensive report on the history of Haiti’s impoverishment at the hands.',
  body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
}

export const Default: StoryObj<ArticleCardProps> = {
  render: () => (
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
        <ArticleStats>
          <ArticleReadingTime articleBody={mock.body} />
          <Divider />
          <ArticleDate date={mock.date} />
        </ArticleStats>
      </ArticleCard.Footer>
    </ArticleCard>
  ),
}
