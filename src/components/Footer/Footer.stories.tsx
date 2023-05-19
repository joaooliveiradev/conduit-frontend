import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from './Footer'

const meta: Meta = {
  component: Footer,
}

export default meta

export const Default: StoryObj = {
  render: (args) => <Footer {...args} />,
}
