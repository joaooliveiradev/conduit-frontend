import Button, { ButtonProps } from './index'
import { Meta, Story } from '@storybook/react'

const stories: Meta = {
  component: Button,
  args: {
    children: 'Sign in',
    isLoading: false,
    disabled: false,
    block: false,
    size: 'large',
  },
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
    },
  },
}

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Default = Template.bind({})

export default stories
