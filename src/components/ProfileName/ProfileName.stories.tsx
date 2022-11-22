import { Meta, Story } from '@storybook/react'
import { ProfileNameProps, ProfileName } from '@/components'

const stories: Meta = {
  component: ProfileName,
  argTypes: {
    size: {
      defaultValue: 5,
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

export default stories

const Template: Story<ProfileNameProps> = (args) => <ProfileName {...args} />

export const Default = Template.bind({})
