import type { Meta, Story } from '@storybook/react'
import {
  ProfileInformation,
  type ProfileInformationProps,
} from './ProfileInformation'

const stories: Meta<ProfileInformationProps> = {
  component: ProfileInformation,
}

export default stories

export const Default: Story<ProfileInformationProps> = () => (
  <ProfileInformation
    name="João Oliveira"
    description="Frontend performance enthusiast and Fine-Grained Reactivity super fan. Author of the SolidJS UI library and MarkoJS Core Team Memberr"
  />
)
