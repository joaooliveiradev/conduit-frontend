import type { Meta, Story } from '@storybook/react'
import { Layout, type LayoutProps } from '@/components'

const stories: Meta<LayoutProps> = {
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

const Template: Story<LayoutProps> = (args) => <Layout {...args} />

export const Empty = Template.bind({})

export const WithContent = Template.bind({})
WithContent.args = {
  children: <h1 style={{ textAlign: 'center', fontSize: '24px'}}>Content</h1>,
}

export default stories
