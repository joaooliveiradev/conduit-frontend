import type { Meta, StoryObj } from '@storybook/react'
import {
  ProfileInformation,
  type ProfileInformationProps,
} from './ProfileInformation'

const meta: Meta<ProfileInformationProps> = {
  component: ProfileInformation,
}

export default meta

export const Default: StoryObj<ProfileInformationProps> = {
  render: () => (
    <ProfileInformation
      name="João Oliveira"
      description="Frontend performance enthusiast and Fine-Grained Reactivity super fan. Author of the SolidJS UI library and MarkoJS Core Team Memberr"
    />
  ),
}
