import { Button, ButtonGroup, Space } from "@jundao/design";
import { default as ButtonStory } from "./Button.stories.jsx";

export default { title: "Components/ButtonGroup", argTypes: ButtonStory.argTypes };

const Template = (props) => {
	return (
		<Space vertical>
			<ButtonGroup>
				<Button {...props} />
				<Button {...props} />
				<Button {...props} />
			</ButtonGroup>

      <ButtonGroup>
        <Button>Button</Button>
        <Button {...props} />
        <Button>Button</Button>
      </ButtonGroup>
		</Space>
	);
};

export const Primary = Template.bind({});
Primary.args = { children: "Button", type: "primary" };

export const Default = Template.bind({});
Default.args = { children: "Button" };

export const Dashed = Template.bind({});
Dashed.args = { children: "Button", type: "dashed" };

export const Large = Template.bind({});
Large.args = { children: "Button", size: "large" };

export const Small = Template.bind({});
Small.args = { children: "Button", size: "small" };

export const Disabled = Template.bind({});
Disabled.args = { children: "Button", disabled: true };

export const Danger = Template.bind({});
Danger.args = { children: "Button", danger: true };
