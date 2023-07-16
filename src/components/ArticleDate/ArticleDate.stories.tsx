import type { Meta, StoryObj } from '@storybook/react'
import { ArticleDate, type ArticleDateProps } from './ArticleDate'

const meta: Meta<ArticleDateProps> = {
  component: ArticleDate,
}

export default meta

export const Default: StoryObj<ArticleDateProps> = {
  render: (args) => <ArticleDate {...args} />,
}
