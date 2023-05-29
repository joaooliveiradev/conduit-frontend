import type { Meta, StoryObj } from '@storybook/react'
import { NewArticle } from './NewArticle'

const meta: Meta = {
  component: NewArticle,
}

export const Default: StoryObj = {
  render: () => <NewArticle />,
}

export default meta
