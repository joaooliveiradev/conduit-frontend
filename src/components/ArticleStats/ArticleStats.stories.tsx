import type { Meta, Story } from '@storybook/react'
import { ArticleStats, type ArticleStatsProps } from './ArticleStats'

const stories: Meta<ArticleStatsProps> = {
  component: ArticleStats,
}

export default stories

const Template: Story<ArticleStatsProps> = (args) => <ArticleStats {...args} />

export const Default = Template.bind({})
Default.args = {
  date: 'May 26, 2022',
  readTime: '3min',
}
