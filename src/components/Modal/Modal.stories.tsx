import type { Meta, StoryObj } from '@storybook/react'
import {
  Modal,
  type ModalProps,
  Title,
  Description,
  Button,
} from '@/components'

const meta: Meta<ModalProps> = {
  component: Modal,
  argTypes: {
    trigger: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

export const Default: StoryObj<ModalProps> = {
  render: () => (
    <Modal trigger={<Button size="large">Sign in</Button>}>
      <div>
        <Title>Title</Title>
        <Description>Description</Description>
      </div>
    </Modal>
  ),
}
