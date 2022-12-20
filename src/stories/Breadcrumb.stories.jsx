import { Text, Space, Breadcrumb, Switch } from "@jundao/design";
import { createSignal } from "solid-js";
import { Link } from "../components";

export default {
	title: "Components/Breadcrumb",
	argTypes: {
		separator: { control: "text" },
		collapsed: { control: "boolean" },
	},
};

const Template = (props) => (
	<Breadcrumb {...props}>
		<Link href="#">Home</Link>
		<Text>Account</Text>
		<Text>Profile</Text>
	</Breadcrumb>
);

export const Default = Template.bind({});
Default.args = {};

export const Separator = Template.bind({});
Separator.args = { separator: ">" };

const AutoCollapseTemplate = (props) => {
	return (
		<Breadcrumb {...props}>
			<Link href="#">Home</Link>
			<Text>Account</Text>
			<Text>Profile</Text>
			<Text>Option 1</Text>
			<Text>Option 2</Text>
			<Text>Option 3</Text>
			<Text>Option 4</Text>
		</Breadcrumb>
	);
};

export const AutoCollapse = AutoCollapseTemplate.bind({});
AutoCollapse.args = {};

const CollapsedTemplate = (props) => {
	const [collapsed, setCollapsed] = createSignal(props.collapsed);

	return (
		<Space vertical align="start">
			<Breadcrumb {...props} collapsed={collapsed()}>
				<Link href="#">Home</Link>
				<Text>Account</Text>
				<Text>Profile</Text>
				<Text>Option 1</Text>
				<Text>Option 2</Text>
				<Text>Option 3</Text>
				<Text>Option 4</Text>
			</Breadcrumb>
			<Switch
				defaultChecked
				onChange={setCollapsed}
				checkedChildren="collapsed"
				uncheckedChildren="extended"
			/>
		</Space>
	);
};

export const Collapsed = CollapsedTemplate.bind({});
Collapsed.args = { collapsed: true };
