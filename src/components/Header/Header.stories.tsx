import { Meta, Story } from "@storybook/react";
import { Header } from "@components/Header";

const stories: Meta = {
  component: Header,
}

export default stories

const Template: Story = (args) => <Header {...args} />

export const Default = Template.bind({})

