import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

const meta: Meta = {
  component: Divider,
}

export default meta

export const Default: StoryObj = {
  render: () => <Divider />,
}
