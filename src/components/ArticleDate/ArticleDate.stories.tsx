import type { Meta, StoryObj } from '@storybook/react'
import { type ArticleDateProps, ArticleDate } from './ArticleDate'

const meta: Meta = {
  component: ArticleDate,
}

export default meta

export const Default: StoryObj<ArticleDateProps> = {
  render: (args) => <ArticleDate {...args} />,
}
