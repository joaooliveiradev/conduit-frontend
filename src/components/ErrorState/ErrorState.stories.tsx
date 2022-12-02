import { Meta, Story } from "@storybook/react";
import { ErrorState, ErrorStateProps } from "@/components";

const stories: Meta<ErrorStateProps> = {
  component: ErrorState
}

export default stories

const Template: Story<ErrorStateProps> = (args) => <ErrorState {...args} />

export const Default = Template.bind({})
Default.args = {
  title: "Something went wrong.",
  message: "This user hasn't written any articles yet.",
  buttonLabel: 'Try again',
  disabled: false,
  block: false,
  buttonisLoading: false,
  buttonOnClick: () => null
}
