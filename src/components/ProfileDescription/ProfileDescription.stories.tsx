import type { Meta, Story } from '@storybook/react'
import { ProfileDescription, type ProfileDescriptionProps } from './ProfileDescription'

const stories: Meta<ProfileDescriptionProps> = {
  component: ProfileDescription,
}

export const Default: Story<ProfileDescriptionProps> = () => (
  <ProfileDescription
    name="João"
    description="Frontend performance enthusiast and Fine-Grained Reactivity super fan. Author of the SolidJS UI library and MarkoJS Core Team Memberr"
  />
)

export default stories
