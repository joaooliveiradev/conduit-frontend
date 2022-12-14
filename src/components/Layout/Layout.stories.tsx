import { Meta, Story } from '@storybook/react'
import { Layout, LayoutProps } from '@/components'

const stories: Meta<LayoutProps> = {
  component: Layout,
  argTypes: {
    children: {
      table: {
        disable: true
      }
    }
  }
}

const Template: Story<LayoutProps> = (args) => <Layout {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <h1>Default</h1>,
}


export default stories
