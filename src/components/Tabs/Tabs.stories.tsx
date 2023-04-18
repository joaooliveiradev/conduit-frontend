import type { Meta, Story } from '@storybook/react'
import { TabContent, Pane, Tabs, TabsPane } from './Tabs'
import styled from 'styled-components'

const stories: Meta = {
  component: Tabs,
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export default stories

const Text = styled.h1`
  font-size: 2.4rem;
`

export const Template: Story = () => (
  <Tabs defaultValue="global">
    <Pane>
      <TabsPane value="global">Global</TabsPane>
      <TabsPane value="foryou">For You</TabsPane>
    </Pane>
    <TabContent value="global">
      <Text>Global Content</Text>
    </TabContent>
    <TabContent value="foryou">
      <Text>For you Content</Text>
    </TabContent>
  </Tabs>
)
