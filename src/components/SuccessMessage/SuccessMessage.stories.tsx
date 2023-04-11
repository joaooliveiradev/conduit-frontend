import type { Meta, Story } from '@storybook/react'
import {
  TextButton,
  SuccessMessage,
  type SuccessMessageProps,
} from '@/components'

const stories: Meta<SuccessMessageProps> = {
  component: SuccessMessage,
}

export default stories

export const Default: Story<SuccessMessageProps> = () => (
  <SuccessMessage>
    <SuccessMessage.Message>
      Congratulations! Your article has been successfully created.
    </SuccessMessage.Message>
    <TextButton href="/article/teste">View</TextButton>
  </SuccessMessage>
)
