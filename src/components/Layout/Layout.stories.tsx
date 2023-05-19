import type { Meta, StoryObj } from '@storybook/react'
import { Layout, type LayoutProps } from '@/components'

const meta: Meta<LayoutProps> = {
  component: Layout,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    hydratedState: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

const Template = (args: LayoutProps) => <Layout {...args} />

export const Empty: StoryObj<LayoutProps> = {
  render: (args) => <Template {...args} />,
}

export const WithContent: StoryObj<LayoutProps> = {
  render: (args) => <Template {...args} />,
  args: {
    children: (
      <h1 style={{ textAlign: 'center', fontSize: '24px' }}>Content</h1>
    ),
  },
}
