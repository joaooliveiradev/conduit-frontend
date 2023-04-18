import type { Meta, Story } from '@storybook/react'
import { useState } from 'react'
import { Toast, type ToastProps, Button } from '@/components'

const stories: Meta<ToastProps> = {
  component: Toast,
  argTypes: {
    open: {
      control: false,
    },
    description: {
      defaultValue: 'Toast Description',
    },
    title: { defaultValue: 'Toast Title' },
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

export default stories

export const Default: Story<ToastProps> = (args) => {
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
