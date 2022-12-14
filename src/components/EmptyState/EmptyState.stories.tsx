import { Meta, Story } from '@storybook/react'
import { EmptyState, EmptyStateProps } from '@/components'

const stories: Meta<EmptyStateProps> = {
  component: EmptyState,
}

export default stories

const Template: Story<EmptyStateProps> = (args) => (
  <EmptyState {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: "No articles are here... yet.",
  message: "This user hasn't written any articles yet."
}
