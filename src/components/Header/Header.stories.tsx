import { Meta, Story } from "@storybook/react";
import { Header, HeaderProps } from "./index";

const stories: Meta<HeaderProps> = {
  component: Header,
}

export default stories

const Template: Story<HeaderProps> = (args) => <Header {...args} />

export const Default = Template.bind({})
Default.args = {
  userLogged: true
}
