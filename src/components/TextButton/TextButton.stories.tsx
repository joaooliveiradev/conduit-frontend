import type { Meta, StoryObj } from '@storybook/react'
import { TextButton, type TextButtonProps } from './TextButton'

const meta: Meta<TextButtonProps> = {
  component: TextButton,
}

export const Default: StoryObj<TextButtonProps> = {
  render: (args: TextButtonProps) => <TextButton {...args} />,
  args: {
    href: '/new-profile',
    children: 'Edit Profile',
  },
}

export default meta
