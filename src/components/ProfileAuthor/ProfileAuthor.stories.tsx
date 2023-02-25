import { Meta, Story } from '@storybook/react'
import { ProfileAuthor, type ProfileAuthorProps } from './index'

const stories: Meta<ProfileAuthorProps> = {
  component: ProfileAuthor,
}

export const Default: Story<ProfileAuthorProps> = () => (
  <ProfileAuthor author="João" />
)

export default stories
