import { Meta, Story } from "@storybook/react";
import { ArticleCard } from "./index";

const stories: Meta = {
  component: ArticleCard
}

const Template: Story = (args) => <ArticleCard {...args} />

export const Default = Template.bind({})

export default stories
