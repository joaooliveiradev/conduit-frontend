import type { Meta, StoryObj } from '@storybook/react'
import { ProfileHeader, type ProfileHeaderProps } from './ProfileHeader'

const meta: Meta<ProfileHeaderProps> = {
  component: ProfileHeader,
}

export default meta

export const Default: StoryObj<ProfileHeaderProps> = {
  render: () => (
    <ProfileHeader
      name="João Oliveira"
      description="Frontend performance enthusiast and Fine-Grained Reactivity super fan. Author of the SolidJS UI library and MarkoJS Core Team Memberr"
    />
  ),
}
