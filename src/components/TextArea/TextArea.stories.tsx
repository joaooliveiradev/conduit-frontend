import type { Story, Meta } from '@storybook/react'
import { TextArea, type TextAreaProps } from './TextArea'

const stories: Meta<TextAreaProps> = {
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
  },
}

export default stories

const Template: Story<TextAreaProps> = (args) => <TextArea {...args} />

export const Empty = Template.bind({})
Empty.args = {
  placeholder: 'Type something awesome!',
}

export const Filled = Template.bind({})
Filled.args = {
  children: 'Content',
}

export const Errored = Template.bind({})
Errored.args = {
  errorMessage: 'Some error message.',
  defaultValue: 'Some value.',
}
