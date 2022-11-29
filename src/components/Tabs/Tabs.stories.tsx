import { Meta, Story } from '@storybook/react'
import styled from 'styled-components'
import { TabContent, Pane, Tabs, TabsPane } from './index'

const stories: Meta = {
  component: Tabs,
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export default stories

const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 20px;
`

const SomeContent = styled.div`
  width: 100%;
  height: 200px;
  background-color: red;
`

export const Template: Story = () => (
  <Tabs defaultValue="global">
    <Pane>
      <TabsPane value="global">Global</TabsPane>
      <TabsPane value="foryou">For You</TabsPane>
    </Pane>
    <TabContent value="global">
      <Box>
        <SomeContent />
        <SomeContent />
        <SomeContent />
        <SomeContent />
        <SomeContent />
        <SomeContent />
      </Box>
    </TabContent>
    <TabContent value="foryou">
      <SomeContent />
    </TabContent>
  </Tabs>
)
