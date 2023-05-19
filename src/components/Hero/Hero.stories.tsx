import type { Meta, StoryObj } from '@storybook/react'
import { Hero, type HeroProps } from './Hero'

const meta: Meta<HeroProps> = {
  component: Hero,
}

export default meta

export const Default: StoryObj<HeroProps> = {
  render: (args) => <Hero {...args} />,
  args: {
    userStatus: 'idle',
  },
}
