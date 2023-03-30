import type { Meta, Story } from '@storybook/react'
import { Layout, LayoutProps } from '@/components'
import styled from 'styled-components'

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

const MockComponent = styled.div`
  width: 100%;
  height: 100%;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Template: Story<LayoutProps> = (args) => <Layout {...args} />

export const Empty = Template.bind({})

export const WithContent = Template.bind({})
WithContent.args = {
  children: <MockComponent>Content</MockComponent>,
}

export default stories
