import { Meta, Story } from "@storybook/react";
import { ErrorState } from "./index";

const stories: Meta = {
  component: ErrorState
}

export default stories

const Template: Story = (args) => <ErrorState {...args} />

export const Default = Template.bind({})
