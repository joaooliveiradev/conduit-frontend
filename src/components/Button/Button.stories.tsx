import { type ButtonProps, Button } from './Button'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<ButtonProps> = {
  component: Button,
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
    },
  },
}

export default meta

export const Default: StoryObj<ButtonProps> = {
  render: (args) => <Button {...args} />,
  args: {
    children: 'Sign in',
    isLoading: false,
    disabled: false,
    block: false,
    size: 'large',
  },
}
