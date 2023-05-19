import type { Meta, StoryObj } from '@storybook/react'
import { ErrorState, type ErrorStateProps } from './ErrorState'

const meta: Meta<ErrorStateProps> = {
  component: ErrorState,
}

export default meta

export const Default: StoryObj<ErrorStateProps> = {
  render: (args) => <ErrorState {...args} />,
  args: {
    title: 'Something went wrong.',
    message: "This user hasn't written any articles yet.",
    buttonLabel: 'Try again',
    disabled: false,
    block: false,
    isButtonLoading: false,
    onButtonClick: () => null,
  },
}
