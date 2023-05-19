import type { Meta, StoryObj } from '@storybook/react'
import { type AvatarProps, Avatar } from './Avatar'

const meta: Meta<AvatarProps> = {
  component: Avatar,
  argTypes: {
    size: {
      control: {
        type: 'range',
      },
    },
  },
}

export default meta

export const Default: StoryObj<AvatarProps> = {
  render: (args) => <Avatar {...args} />,
  args: {
    name: 'Joao Oliveira',
    size: 4,
  },
}
