import { Meta, Story } from "@storybook/react";
import { Footer } from "@components/Footer";

const stories: Meta = {
  component: Footer
}

const Template: Story = (args) => <Footer {...args} />

export const Default = Template.bind({})

export default stories
