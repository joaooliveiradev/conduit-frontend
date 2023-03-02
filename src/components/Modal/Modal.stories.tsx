import type { Meta, Story } from '@storybook/react'
import { Modal, ModalProps, Title, Description } from './Modal'
import { Button } from '@/components'

const stories: Meta<ModalProps> = {
  component: Modal,
  argTypes: {
    trigger: {
      table: {
        disable: true,
      },
    },
  },
}

const Template: Story<ModalProps> = () => (
  <Modal trigger={<Button size="large">Sign in</Button>}>
    <div>
      <Title>Title</Title>
      <Description>Description</Description>
    </div>
  </Modal>
)

export const Default = Template.bind({})

export default stories
