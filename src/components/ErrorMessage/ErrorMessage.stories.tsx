import type { Meta, Story } from '@storybook/react'
import { type ErrorMessageProps, ErrorMessage } from './index'

const stories: Meta<ErrorMessageProps> = {
  component: ErrorMessage,
  argTypes: {
    message: {
      defaultValue: "Something wen't wrong, please try again.",
    },
  },
}

export default stories

export const Default: Story<ErrorMessageProps> = (args) => (
  <ErrorMessage {...args} />
)
