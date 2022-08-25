import { Meta, Story } from '@storybook/react'
import Avatar, { AvatarProps } from './index'

const stories: Meta = {
  component: Avatar,
  argTypes: {
    size: {
      defaultValue: 1,
      control: {
        type: 'inline-radio',
      },
    },
    name: {
      defaultValue: 'João Oliveira',
      type: 'string',
    },
  },
}

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />

export const Default = Template.bind({})

export default stories
