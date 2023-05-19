import type { Meta, StoryObj } from '@storybook/react'
import {
  ProfileName,
  Dropdown,
  DropdownItem,
  type DropdownProps,
} from '@/components'

const meta: Meta<DropdownProps> = {
  component: Dropdown,
  argTypes: {
    trigger: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

export const Default: StoryObj<DropdownProps> = {
  render: () => {
    return (
      <Dropdown trigger={<ProfileName size={4} name="João" />}>
        <DropdownItem href="/profile" label="Profiles" />
        <DropdownItem href="/signout" label="Sign out" />
      </Dropdown>
    )
  },
}
