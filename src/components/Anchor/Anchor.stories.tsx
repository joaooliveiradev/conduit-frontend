import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'
import { Anchor, type AnchorProps } from './Anchor'

const Wrapper = styled.div`
  padding: 16px;
  font-size: 16px;
`

const meta: Meta<AnchorProps> = {
  component: Anchor,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    prefetch: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

const Template = (args: AnchorProps) => (
  <Anchor href={args.href}>{args.children}</Anchor>
)

const MockComponent = () => (
  <Wrapper>
    <h1>There an link wrapping this component.</h1>
  </Wrapper>
)

export const Default: StoryObj<AnchorProps> = {
  render: (args) => <Template {...args} />,
  args: {
    href: '/profile',
    children: <MockComponent />,
  },
}
