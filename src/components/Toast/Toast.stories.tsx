import type { Meta, Story } from '@storybook/react'
import { Toast, type ToastProps } from './Toast'

const stories: Meta<ToastProps> = {
  component: Toast,
  argTypes: {
    open: {
      defaultValue: true,
    },
    description: {
      defaultValue: 'Toast Description',
    },
    title: { defaultValue: 'Toast Title' },
  },
}

export default stories

export const Default: Story<ToastProps> = (args) => <Toast {...args} />
