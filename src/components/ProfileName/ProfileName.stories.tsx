import type { Meta, StoryObj } from '@storybook/react'
import { type ProfileNameProps, ProfileName } from '@/components'

const meta: Meta = {
  component: ProfileName,
}

export default meta

export const Default: StoryObj<ProfileNameProps> = {
  render: (args) => <ProfileName {...args} />,
  args: {
    size: 4,
    name: 'João Oliveira',
  },
  argTypes: {
    size: {
      control: {
        type: 'range',
      },
    },
  },
}
