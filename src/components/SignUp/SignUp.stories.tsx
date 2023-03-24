import type { Meta, Story } from '@storybook/react'
import { SignUp, type SignUpProps } from './SignUp'

const stories: Meta<SignUpProps> = {
  component: SignUp,
  argTypes: {
    onSwitchFormClick: {
      table: {
        disable: true
      }
    }
  }
}

export default stories

export const Default: Story<SignUpProps> = (args) => <SignUp {...args} />
