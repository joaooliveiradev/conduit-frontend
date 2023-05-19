import type { Meta, StoryObj } from '@storybook/react'
import { ProfileAuthor, type ProfileAuthorProps } from './ProfileAuthor'

const meta: Meta<ProfileAuthorProps> = {
  component: ProfileAuthor,
}

export default meta

export const Default: StoryObj<ProfileAuthorProps> = {
  render: () => <ProfileAuthor author="João" />,
}
