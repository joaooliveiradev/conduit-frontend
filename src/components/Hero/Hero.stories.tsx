import type { Meta, StoryObj } from '@storybook/react'
import { Hero } from './Hero'

const meta: Meta = {
  component: Hero,
}

export default meta

export const Default: StoryObj = {
  render: (args) => <Hero {...args} />,
}
