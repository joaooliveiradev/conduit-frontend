import {
  ProfileName,
  Dropdown,
  DropdownItem,
  type DropdownProps,
  type DropdownItemProps,
} from '@/components'
import type { Meta, Story } from '@storybook/react'

type DropdownStoriesProp = Omit<DropdownProps, 'children'> & DropdownItemProps

const stories: Meta<DropdownStoriesProp> = {
  component: Dropdown,
  argTypes: {
    trigger: {
      table: {
        disable: true,
      },
    },
    onEventClick: {
      table: {
        disable: true,
      },
    },
  },
}

export default stories

export const Template: Story = () => {
  return (
    <Dropdown trigger={<ProfileName size={4} name="João" />}>
      <DropdownItem href="/profile" label="Profiles" />
      <DropdownItem href="/signout" label="Sign out" />
    </Dropdown>
  )
}
