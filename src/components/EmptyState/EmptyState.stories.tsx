import { Meta, Story } from "@storybook/react";
import { EmptyState } from "./index";

const stories: Meta = {
  component: EmptyState
}

export default stories;

const Template: Story = (args) => <EmptyState {...args} />

export const Default = Template.bind({})
