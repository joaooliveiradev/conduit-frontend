import { Meta, Story } from '@storybook/react'
import Input, { InputProps } from './index'

const stories: Meta = {
  component: Input,
  argTypes: {
    hasError: {
      defaultValue: false,
      type: 'boolean',
    },
  },
}

const Template: Story<InputProps> = (args) => (
  <Input {...args} placeholder="Email" />
)

export const Empty = Template.bind({})
Empty.argTypes = {
  value: {
    defaultValue: '',
  },
}

export const Filled = Template.bind({})
Filled.argTypes = {
  value: {
    defaultValue: 'Email',
    type: 'string',
  },
}

export default stories
