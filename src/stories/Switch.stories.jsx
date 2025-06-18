import { Space, Switch } from "@jundao/design";

export default {
	title: "Components/Switch",
	argTypes: {
		onChange: { action: "onChange" },
		size: {
			control: { type: "select" },
			options: ["small", "default", "large"],
		},
		disabled: { control: "boolean" },
		checked: { control: "boolean" },
		danger: { control: "boolean" },
		defaultChecked: { control: "boolean" },
		checkedChildren: { control: "text" },
		uncheckedChildren: { control: "text" },
		loading: { control: "boolean" },
		label: { control: "text" },
		autofocus: { control: "boolean" },
	},
};

// Solid Icons get treeshaken by mistake
function RiSystemCheckFill(props) {
	return (
		<svg
			fill="currentColor"
			stroke-width="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			style="overflow: visible; color: currentcolor;"
			height="1em"
			width="1em"
		>
			<path
				fill="currentColor"
				d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"
			/>
		</svg>
	);
}
function RiSystemCloseFill(props) {
	return (
		<svg
			fill="currentColor"
			stroke-width="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			style="overflow: visible; color: currentcolor;"
			height="1em"
			width="1em"
		>
			<path
				fill="currentColor"
				d="m12 10.586 4.95-4.95 1.415 1.415-4.95 4.95 4.95 4.95-1.415 1.414-4.95-4.95-4.95 4.95-1.413-1.415 4.95-4.95-4.95-4.95L7.05 5.638l4.95 4.95Z"
			/>
		</svg>
	);
}

const Template = (props) => {
	return <Switch {...props} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Label = Template.bind({});
Label.args = { label: "Label" };

export const Danger = Template.bind({});
Danger.args = { danger: true };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const Text = Template.bind({});
Text.args = { checkedChildren: "on", uncheckedChildren: "off" };

export const Icon = Template.bind({});
Icon.args = {
	checkedChildren: <RiSystemCheckFill title="Checked" />,
	uncheckedChildren: <RiSystemCloseFill title="Unchecked" />,
};

export const Large = Template.bind({});
Large.args = { size: "large" };

export const Small = Template.bind({});
Small.args = { size: "small" };

export const All = (props) => (
	<Space vertical>
		<Switch size="small" />
		<Switch {...props} />
		<Switch size="large" />
	</Space>
);

export const Controlled = Template.bind({});
Controlled.args = { checked: true };

export const Loading = Template.bind({});
Loading.args = { loading: true };

export const Autofocus = Template.bind({});
Autofocus.args = { autofocus: true };
