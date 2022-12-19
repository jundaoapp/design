import { Button, Space } from "@jundao/design";

export default {
	title: "Components/Button",
	argTypes: {
		children: { control: "text" },
		onClick: { action: "onClick" },
		type: {
			control: { type: "select" },
			options: ["primary", "default", "dashed"],
		},
		size: {
			control: { type: "select" },
			options: ["small", "default", "large"],
		},
		disabled: { control: "boolean" },
		danger: { control: "boolean" },
		loading: { control: "boolean" },
	},
};

const Template = (props) => {
	return <Button {...props} />;
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

export const Loading = Template.bind({});
Loading.args = { children: "Button", loading: true };

const GroupTemplate = (props) => (
	<Space vertical>
		<Button.Group>
			<Button {...props} />
			<Button {...props} />
			<Button {...props} />
		</Button.Group>

		<Button.Group>
			<Button>Button</Button>
			<Button {...props} />
			<Button>Button</Button>
		</Button.Group>
	</Space>
);

export const Group = GroupTemplate.bind({});
Group.args = { children: "Button", type: "primary" };
