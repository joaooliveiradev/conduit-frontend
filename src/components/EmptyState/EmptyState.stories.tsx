import type { Meta, StoryObj } from '@storybook/react'
import {
  type EmptyStateProps,
  EmptyState,
  EmptyStateContent,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyIcon,
} from '@/components'

const meta: Meta<EmptyStateProps> = {
  component: EmptyState,
}

export default meta

export const Default: StoryObj<EmptyStateProps> = {
  render: () => (
    <EmptyState>
      <EmptyIcon />
      <EmptyStateContent>
        <EmptyStateTitle>No articles are here... yet.</EmptyStateTitle>
        <EmptyStateDescription>
          We don&apos;t have any articles yet, but you can be the first! Access
          your profile and click in New Article.
        </EmptyStateDescription>
      </EmptyStateContent>
    </EmptyState>
  ),
}
