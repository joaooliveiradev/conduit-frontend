import type { Meta, StoryObj } from '@storybook/react'
import { ArticleHeader, type ArticleHeaderProps } from './ArticleHeader'

const meta: Meta<ArticleHeaderProps> = {
  component: ArticleHeader,
}

export default meta

const Template = (args: ArticleHeaderProps) => <ArticleHeader {...args} />

export const Default: StoryObj<ArticleHeaderProps> = {
  render: (args) => <Template {...args} />,
  args: {
    date: 'May 26, 2022',
    readTime: '3min',
    name: 'Dasilk',
  },
}
