import type { Meta, StoryObj } from '@storybook/react'
import { TextEditor, type TextEditorProps } from './TextEditor'

const meta: Meta<TextEditorProps> = {
  component: TextEditor,
  argTypes: {
    className: {
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

export const Empty: StoryObj<TextEditorProps> = {
  render: (args) => <TextEditor {...args} />,
  args: {
    defaultValue: '',
  },
}

export const Filled: StoryObj<TextEditorProps> = {
  render: (args) => <TextEditor {...args} />,
  args: {
    defaultValue: 'With Content',
  },
}

export const Errored: StoryObj<TextEditorProps> = {
  render: (args) => <TextEditor {...args} />,
  args: {
    defaultValue: 'With Content',
    errorMessage: '',
  },
  argTypes: {
    errorMessage: {
      table: {
        disable: false,
      },
    },
  },
}

export default meta
