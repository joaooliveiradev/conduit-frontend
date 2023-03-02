import type { Meta, Story } from '@storybook/react'
import { TextButton, type TextButtonProps } from './TextButton'

const stories: Meta<TextButtonProps> = {
  component: TextButton,
}

const Template: Story<TextButtonProps> = (args: TextButtonProps) => (
  <TextButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  href: '/new-profile',
  children: 'Edit Profile',
}

export default stories
