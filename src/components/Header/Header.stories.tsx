import { Meta, Story } from "@storybook/react";
import { Header } from "@/components";

const stories: Meta = {
  component: Header,
}

export default stories

const Template: Story = (args) => <Header {...args} />

export const Default = Template.bind({})

