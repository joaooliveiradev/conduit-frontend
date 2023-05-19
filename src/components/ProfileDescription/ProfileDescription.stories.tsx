import type { Meta, StoryObj } from '@storybook/react'
import {
  ProfileDescription,
  type ProfileDescriptionProps,
} from './ProfileDescription'

const meta: Meta<ProfileDescriptionProps> = {
  component: ProfileDescription,
}

export default meta

export const Default: StoryObj<ProfileDescriptionProps> = {
  render: () => (
    <ProfileDescription
      name="João"
      description="Frontend performance enthusiast and Fine-Grained Reactivity super fan. Author of the SolidJS UI library and MarkoJS Core Team Memberr"
    />
  ),
}
