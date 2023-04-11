import type { Meta, Story } from '@storybook/react'
import {
  type ErrorFieldMessageProps,
  ErrorFieldMessage,
} from './ErrorFieldMessage'

const stories: Meta<ErrorFieldMessageProps> = {
  component: ErrorFieldMessage,
  argTypes: {
    message: {
      defaultValue: "Something wen't wrong, please try again.",
    },
  },
}

export default stories

export const Default: Story<ErrorFieldMessageProps> = (args) => (
  <ErrorFieldMessage {...args} />
)
