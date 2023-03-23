import { type Meta, type Story } from '@storybook/react'
import { Hero, type HeroProps } from './Hero'

const stories: Meta<HeroProps> = {
  component: Hero,
}

export default stories

const Template: Story<HeroProps> = (args) => <Hero {...args} />

export const Default = Template.bind({})
Default.args = {
  userStatus: 'idle',
}
