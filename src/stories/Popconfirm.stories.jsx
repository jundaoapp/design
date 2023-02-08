import { Button, Space, Popconfirm, Link } from "@jundao/design";
import { action } from "@storybook/addon-actions";

export default {
	title: "Components/Popconfirm",
	argTypes: {
		onClick: { action: "onClick" },
		type: {
			control: { type: "select" },
			options: ["info", "danger", "warning"],
		},
		disabled: { control: "boolean" },
		title: { control: "text" },
		description: { control: "text" },
		showCancel: { control: "boolean" },
		confirmText: { control: "text" },
		cancelText: { control: "text" },
	},
};

const Template = (props) => {
	return (
		<Space align="center">
			<Popconfirm {...props}>
				<Button onClick={() => action("onClick")}>Button</Button>
			</Popconfirm>
			<Popconfirm {...props}>
				<Link href="https://jundao.app" target="_blank">
					Link
				</Link>
			</Popconfirm>
		</Space>
	);
};

export const Default = Template.bind({});
Default.args = {
	title: "Popconfirm",
	description: "Are you sure you want to complete this action?",
};

export const NoDescription = Template.bind({});
NoDescription.args = { title: "Popconfirm" };

export const Disabled = Template.bind({});
Disabled.args = {
	title: "Popconfirm",
	description: "Are you sure you want to complete this action?",
	disabled: true,
};

export const Danger = Template.bind({});
Danger.args = {
	title: "Popconfirm",
	description: "Are you sure you want to complete this action?",
	type: "danger",
};

export const Warning = Template.bind({});
Warning.args = {
	title: "Popconfirm",
	description: "Are you sure you want to complete this action?",
	type: "warning",
};

export const CustomText = Template.bind({});
CustomText.args = {
	title: "Popconfirm",
	description: "Are you sure you want to complete this action?",
	confirmText: "Yes",
	cancelText: "No",
};

const promise = () =>
	new Promise((resolve) => {
		setTimeout(() => resolve(), 3000);
	});

export const Promise_ = Template.bind({});
Promise_.args = {
	title: "Popconfirm",
	description: "Are you sure you want to complete this action?",
	onConfirm: promise,
	onCancel: promise,
};
