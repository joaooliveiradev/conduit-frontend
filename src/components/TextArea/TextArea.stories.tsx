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
  },
}

export default stories

const Template: Story<TextAreaProps> = (args) => <TextArea {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Content',
}
