import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './Header'

const meta: Meta = {
  component: Header,
}

export default meta

export const Default: StoryObj = {
  render: (args) => <Header {...args} />,
}
