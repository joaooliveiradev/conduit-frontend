import { Story, type Meta } from '@storybook/react'
import { TextArea, type TextAreaProps } from './TextArea'

const stories: Meta<TextAreaProps> = {
  component: TextArea,
  argTypes: {
    touched: {
      table: {
        disable: true,
      },
    },
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
  touched: true,
  defaultValue: 'Some value.',
}
