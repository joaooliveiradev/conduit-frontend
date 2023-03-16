import type { Meta, Story } from '@storybook/react'
import styled from 'styled-components'
import { Anchor, type AnchorProps } from './Anchor'

const Wrapper = styled.div`
  padding: 16px;
  font-size: 16px;
`

const stories: Meta<AnchorProps> = {
  component: Anchor,
  argTypes: {
    children: {
      table: {
        disable: true
      }
    }
  }
}

export default stories

const Template: Story<AnchorProps> = (args) => (
  <Anchor href={args.href}>{args.children}</Anchor>
)

const MockComponent = () => (
  <Wrapper>
    <h1>There an link wrapping this component.</h1>
  </Wrapper>
)

export const Default = Template.bind({})

Default.args = {
  href: '/profile',
  children: <MockComponent />,
}
