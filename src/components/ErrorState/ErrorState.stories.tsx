import type { Meta, StoryObj } from '@storybook/react'
import {
  type ErrorStateProps,
  ErrorStateIcon,
  ErrorState,
  ErrorStateTextContent,
  ErrorStateTitle,
  ErrorStateMessage,
  Button,
} from '@/components'

const meta: Meta<ErrorStateProps> = {
  component: ErrorState,
}

export default meta

export const Default: StoryObj<ErrorStateProps> = {
  render: () => (
    <ErrorState>
      <ErrorStateIcon />
      <ErrorStateTextContent>
        <ErrorStateTitle>Something went wrong.</ErrorStateTitle>
        <ErrorStateMessage>
          This user hasn&apos;t written any articles yet.
        </ErrorStateMessage>
      </ErrorStateTextContent>
      <Button size="large">Try again</Button>
    </ErrorState>
  ),
}
