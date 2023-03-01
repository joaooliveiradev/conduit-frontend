import type { Meta, Story } from '@storybook/react'
import { Footer } from '@/components'

const stories: Meta = {
  component: Footer,
}

const Template: Story = (args) => <Footer {...args} />

export const Default = Template.bind({})

export default stories
