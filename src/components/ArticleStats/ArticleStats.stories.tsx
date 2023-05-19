import type { Meta, StoryObj } from '@storybook/react'
import { ArticleStats, type ArticleStatsProps } from './ArticleStats'

const meta: Meta<ArticleStatsProps> = {
  component: ArticleStats,
}

export default meta

export const Default: StoryObj<ArticleStatsProps> = {
  render: (args) => <ArticleStats {...args} />,
  args: {
    date: 'May 26, 2022',
    readTime: '3min',
  },
}
