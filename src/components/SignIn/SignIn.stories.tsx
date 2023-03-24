import { Story, type Meta } from '@storybook/react'
import { SignIn, type SignInProps } from './SignIn'

const stories: Meta<SignInProps> = {
  component: SignIn,
  argTypes: {
    onSwitchFormClick: {
      table: {
        disable: true,
      },
    },
  },
}

export default stories

export const Default: Story<SignInProps> = (args) => <SignIn {...args} />
