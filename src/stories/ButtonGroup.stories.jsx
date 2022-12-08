import { Button, ButtonGroup } from "@jundao/design";

export default { title: "Components/ButtonGroup" };

const Template = (props) => {
	return (
		<>
			<ButtonGroup>
				<Button {...props} />
				<Button {...props} />
				<Button {...props} />
			</ButtonGroup>
		</>
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
