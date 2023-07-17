import type { Meta, StoryObj } from '@storybook/react'
import { ArticleStats, type ArticleStatsProps } from './ArticleStats'
import { ArticleReadingTime } from '../ArticleReadingTime/ArticleReadingTime'
import { Divider } from '../Divider/Divider'
import { ArticleDate } from '../ArticleDate/ArticleDate'

const meta: Meta<ArticleStatsProps> = {
  component: ArticleStats,
}

export default meta

const mock = {
  date: 'May 26, 2022',
  articleBody:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
}

export const ReadingTime: StoryObj<ArticleStatsProps> = {
  render: () => (
    <ArticleStats>
      <ArticleReadingTime articleBody={mock.articleBody} />
    </ArticleStats>
  ),
}

export const Date: StoryObj<ArticleStatsProps> = {
  render: () => (
    <ArticleStats>
      <ArticleDate date={mock.date} />
    </ArticleStats>
  ),
}

export const WithComposition: StoryObj<ArticleStatsProps> = {
  render: () => (
    <ArticleStats>
      <ArticleReadingTime articleBody={mock.articleBody} />
      <Divider />
      <ArticleDate date={mock.date} />
    </ArticleStats>
  ),
}
