import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState, type EmptyStateProps } from './EmptyState'

const meta: Meta<EmptyStateProps> = {
  component: EmptyState,
}

export default meta

export const Default: StoryObj<EmptyStateProps> = {
  render: (args) => <EmptyState {...args} />,
  args: {
    title: 'No articles are here... yet.',
    message: "This user hasn't written any articles yet.",
  },
}
