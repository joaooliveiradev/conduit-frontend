import { Meta, Story } from '@storybook/react'
import { EmptyState, EmptyStateProps } from './index'

const stories: Meta<EmptyStateProps> = {
  component: EmptyState,
}

export default stories

const Template: Story<EmptyStateProps> = (args) => (
  <EmptyState {...args} message="This user hasn't written any articles yet." />
)

export const Default = Template.bind({})
