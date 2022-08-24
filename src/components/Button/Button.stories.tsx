import Button, { ButtonProps } from './index'
import { Meta, Story } from '@storybook/react'

const stories: Meta = {
  component: Button,
  argTypes: {
    children: {
      defaultValue: 'Sign in',
      type: 'string',
    },
    size: {
      defaultValue: 'large',
    },
    isLoading: {
      defaultValue: false,
    },
    disabled: {
      defaultValue: false,
    },
    block: {
      defaultValue: true,
    },
  },
}

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Default = Template.bind({})

export default stories
