import type { Meta, Story } from '@storybook/react'
import { ArticleHeader, type ArticleHeaderProps } from './index'

const stories: Meta<ArticleHeaderProps> = {
  component: ArticleHeader,
}

const Template: Story<ArticleHeaderProps> = (args) => (
  <ArticleHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  date: 'May 26, 2022',
  readingTime: '3min',
  name: 'Dasilk Tchernes'
}

export default stories
