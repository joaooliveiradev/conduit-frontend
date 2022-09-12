import { Meta, Story } from "@storybook/react";
import { ErrorState, ErrorStateProps } from "./index";

const stories: Meta<ErrorStateProps> = {
  component: ErrorState
}

export default stories

const Template: Story<ErrorStateProps> = (args) => <ErrorState {...args} message="This user hasn't written any articles yet." />

export const Default = Template.bind({})
