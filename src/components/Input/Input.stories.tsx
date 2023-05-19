import type { Meta, StoryObj } from '@storybook/react'
import { type InputProps, Input } from '@/components'

const meta: Meta<InputProps> = {
  component: Input,
  argTypes: {
    inputRef: {
      table: {
        disable: true,
      },
    },
    errorMessage: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

const Template = (args: InputProps) => <Input {...args} placeholder="Email" />

export const Empty: StoryObj<InputProps> = {
  render: (args) => <Template {...args} />,
  args: {
    value: '',
  },
  argTypes: {
    value: {
      table: {
        disable: true,
      },
    },
  },
}

export const Filled: StoryObj<InputProps> = {
  render: (args) => <Template {...args} />,
  args: {
    value: 'Email',
  },
}

export const Errored: StoryObj<InputProps> = {
  render: (args) => <Template {...args} />,
  args: {
    value: 'Some wrong value',
    errorMessage: 'Some error message ',
  },
  argTypes: {
    errorMessage: {
      table: {
        disable: false,
      },
    },
  },
}
