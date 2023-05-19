import type { StoryObj, Meta } from '@storybook/react'
import { TextArea, type TextAreaProps } from './TextArea'

const meta: Meta<TextAreaProps> = {
  component: TextArea,
  argTypes: {
    errorMessage: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    defaultValue: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

const Template = (args: TextAreaProps) => <TextArea {...args} />

export const Empty: StoryObj<TextAreaProps> = {
  render: (args) => <Template {...args} />,
  args: {
    placeholder: 'Type something awesome!',
  },
  argTypes: {
    placeholder: {
      table: {
        disable: true,
      },
    },
  },
}

export const Filled: StoryObj<TextAreaProps> = {
  render: (args) => <Template {...args} />,
  args: {
    defaultValue: 'Content',
  },
}

export const Errored: StoryObj<TextAreaProps> = {
  render: (args) => <Template {...args} />,
  args: {
    errorMessage: 'Some error message.',
    defaultValue: 'Some value.',
  },
}
