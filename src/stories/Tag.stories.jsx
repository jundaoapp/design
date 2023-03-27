import { Space, Tag, Switch } from "@jundao/design";
import { createSignal, Show } from "solid-js";

export default {
	title: "Components/Tag",
	argTypes: {
		children: { control: "string" },
		status: {
			control: { type: "select" },
			options: ["success", "default", "error", "warning"],
		},
		href: { control: "text" },
	},
};

const Template = (props) => (
	<Space align="start">
		<Tag {...props} />
		<Tag status="success">Success</Tag>
		<Tag closeable {...props} />
		<Tag status="warning">Warning</Tag>
		<Tag status="error">Error</Tag>
	</Space>
);

export const Default = Template.bind({});
Default.args = { children: "Tag" };

export const Success = Template.bind({});
Success.args = { children: "Tag", status: "success" };

export const Error_ = Template.bind({});
Error_.args = { children: "Tag", status: "error" };

export const Warning = Template.bind({});
Warning.args = { children: "Tag", status: "warning" };

export const Link = Template.bind({});
Link.args = { children: "Tag", href: "#" };

export const CustomColor = Template.bind({});
CustomColor.args = {
	children: "Tag",
	color: "var(--jdd-purple-6)",
	background: "rgba(var(--jdd-purple-9-rgb), .2)",
};
