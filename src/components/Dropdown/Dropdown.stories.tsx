import type { Meta, StoryObj } from '@storybook/react'
import {
  type DropdownProps,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownList,
  DropdownItem,
  ProfileName,
} from '@/components'

const meta: Meta<DropdownProps> = {
  component: Dropdown,
}

export default meta

export const Default: StoryObj<DropdownProps> = {
  render: () => {
    return (
      <Dropdown>
        <DropdownTrigger>
          <ProfileName size={4} name="João" />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownList>
            <DropdownItem href="/profile" label="Profiles" />
            <DropdownItem href="/signout" label="Sign out" />
          </DropdownList>
        </DropdownContent>
      </Dropdown>
    )
  },
}
