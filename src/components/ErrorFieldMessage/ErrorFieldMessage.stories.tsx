import type { Meta, StoryObj } from '@storybook/react'
import {
  ErrorFieldMessage,
  type ErrorFieldMessageProps,
} from './ErrorFieldMessage'

const meta: Meta<ErrorFieldMessageProps> = {
  component: ErrorFieldMessage,
}

export default meta

export const Default: StoryObj<ErrorFieldMessageProps> = {
  render: (args) => <ErrorFieldMessage {...args} />,
  args: {
    message: "Something wen't wrong, please try again.",
    fontWeight: 'medium',
    textAlign: 'center',
  },
  argTypes: {
    id: {
      table: {
        disable: true,
      },
    },
  },
}
