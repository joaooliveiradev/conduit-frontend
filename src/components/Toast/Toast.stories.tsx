import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button, Toast, type ToastProps } from '@/components'

const meta: Meta<ToastProps> = {
  component: Toast,
  argTypes: {
    open: {
      control: false,
    },
    label: {
      table: {
        disable: true,
      },
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

const Template = (args: ToastProps) => {
  const [open, setOnOpenChange] = useState(true)
  return (
    <>
      <Toast {...args} open={open} onOpenChange={setOnOpenChange} />
      <Button size="large" onClick={() => setOnOpenChange(true)}>
        Reset
      </Button>
    </>
  )
}
export const Default: StoryObj<ToastProps> = {
  render: (args) => <Template {...args} />,
  args: {
    title: 'Toast Title',
    description: 'Toast Description',
  },
}
