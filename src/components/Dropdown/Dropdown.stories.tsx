import ProfileName from '@components/ProfileName'
import { Meta, Story } from '@storybook/react'
import {
  Dropdown,
  DropdownItem,
  DropdownProps,
  DropdownItemProps,
} from './index'

type DropdownStoriesProp = Omit<DropdownProps, 'children'> & DropdownItemProps

const stories: Meta<DropdownStoriesProp> = {
  component: Dropdown,
  argTypes: {
    triggerElement: {
      table: {
        disable: true,
      },
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
}

export default stories

const Template: Story<DropdownItemProps> = (args) => {
  const { href, label } = args
  return (
    <Dropdown triggerElement={<ProfileName size={4} name="João" />}>
      <DropdownItem href={href} label={label} />
    </Dropdown>
  )
}

export const Empty = Template.bind({})
Empty.args = {}

export const WithItem = Template.bind({})
WithItem.args = {
  href: '/profile',
  label: 'Profile',
}
