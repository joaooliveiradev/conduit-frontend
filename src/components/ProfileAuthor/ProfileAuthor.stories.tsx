import type { Meta, Story } from '@storybook/react'
import { ProfileAuthor, type ProfileAuthorProps } from './ProfileAuthor'

const stories: Meta<ProfileAuthorProps> = {
  component: ProfileAuthor,
}

export const Default: Story<ProfileAuthorProps> = () => (
  <ProfileAuthor author="João" />
)

export default stories
