import { Meta, Story } from '@storybook/react'
import { AvatarProps, Avatar } from '@/components'

const stories: Meta = {
  component: Avatar,
  argTypes: {
    size: {
      defaultValue: 1,
      control: {
        type: 'range',
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
