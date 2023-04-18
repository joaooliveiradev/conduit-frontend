import type { Meta, Story } from '@storybook/react'
import { type InputProps, Input } from '@/components'

const stories: Meta = {
  component: Input,
  argTypes: {
    touched: {
      table: {
        disable: true,
      },
    },
  },
}

const Template: Story<InputProps> = (args) => (
  <Input {...args} placeholder="Email" />
)

export const Empty = Template.bind({})
Empty.argTypes = {
  errorMessage: {
    control: false,
  },
}

export const Filled = Template.bind({})
Filled.args = {
  value: 'Email',
}
Filled.argTypes = {
  errorMessage: {
    control: false,
  },
}

export const Errored = Template.bind({})
Errored.args = {
  value: 'Some wrong value',
  errorMessage: 'Some error message',
  touched: true,
}

export default stories
