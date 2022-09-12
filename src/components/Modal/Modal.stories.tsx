import { Meta, Story } from '@storybook/react'
import { Modal, ModalProps } from './index'
import Button from '@components/Button'

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
    <h1>Modal</h1>
  </Modal>
)

export const Default = Template.bind({})

export default stories
