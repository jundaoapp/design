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
		<Breadcrumb.Link href="#">Home</Breadcrumb.Link>
		<Breadcrumb.Link>Account</Breadcrumb.Link>
		<Breadcrumb.Link current>Profile</Breadcrumb.Link>
	</Breadcrumb>
);

export const Default = Template.bind({});
Default.args = {};

export const Separator = Template.bind({});
Separator.args = { separator: ">" };

const AutoCollapseTemplate = (props) => {
	return (
		<Breadcrumb {...props}>
			<Breadcrumb.Link href="#">Home</Breadcrumb.Link>
			<Breadcrumb.Link>Account</Breadcrumb.Link>
			<Breadcrumb.Link>Profile</Breadcrumb.Link>
			<Breadcrumb.Link>Option 1</Breadcrumb.Link>
			<Breadcrumb.Link>Option 2</Breadcrumb.Link>
			<Breadcrumb.Link>Option 3</Breadcrumb.Link>
			<Breadcrumb.Link current>Option 4</Breadcrumb.Link>
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
				<Breadcrumb.Link href="#">Home</Breadcrumb.Link>
				<Breadcrumb.Link>Account</Breadcrumb.Link>
				<Breadcrumb.Link>Profile</Breadcrumb.Link>
				<Breadcrumb.Link>Option 1</Breadcrumb.Link>
				<Breadcrumb.Link>Option 2</Breadcrumb.Link>
				<Breadcrumb.Link>Option 3</Breadcrumb.Link>
				<Breadcrumb.Link current>Option 4</Breadcrumb.Link>
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
