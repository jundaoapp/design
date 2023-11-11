import { Button, Card, Space, Text } from "@jundao/design";
import { createSignal } from "solid-js";

export default {
	title: "Components/Card",
	argTypes: {
		title: { control: "text" },
		size: {
			control: { type: "select" },
			options: ["small", "default"],
		},
		collapsible: { control: "boolean" },
		collapsed: { control: "boolean" },
	},
};

const Template = (props) => (
	<Card {...props} style={{ width: "16rem" }}>
		<Text>Card content</Text>
		<br />
		<Text>Card content</Text>
		<br />
		<Text>Card content</Text>
		<br />
	</Card>
);

export const Default = Template.bind({});
Default.args = { title: "Card Title" };

export const Small = Template.bind({});
Small.args = { size: "small", title: "Card Title" };

export const NoTitle = Template.bind({});

export const NoPadding = Template.bind({});
NoPadding.args = { title: "Card Title", noPadding: true };

export const Collapsible = Template.bind({});
Collapsible.args = { title: "Card Title", collapsible: true };

const TemplateCollapsed = (props) => {
	const [collapsed, setCollapsed] = createSignal(props.collapsed);
	return (
		<Space align="start">
			<Card {...props} collapsed={collapsed()} style={{ width: "16rem" }}>
				<Text>Card content</Text>
				<br />
				<Text>Card content</Text>
				<br />
				<Text>Card content</Text>
				<br />
			</Card>

			<Button type="primary" onClick={() => setCollapsed(!collapsed())}>
				Toggle
			</Button>
		</Space>
	);
};

export const Collapsed = TemplateCollapsed.bind({});
Collapsed.args = { title: "Card Title", collapsed: true };
