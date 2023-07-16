import type { Meta, StoryObj } from '@storybook/react'
import {
  ArticleReadingTime,
  type ArticleReadingTimeProps,
} from './ArticleReadingTime'

const meta: Meta<ArticleReadingTimeProps> = {
  component: ArticleReadingTime,
  args: {
    articleBody:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  },
}

export default meta

export const Default: StoryObj<ArticleReadingTimeProps> = {
  render: (args) => <ArticleReadingTime {...args} />,
}
