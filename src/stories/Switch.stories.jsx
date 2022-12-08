import { Switch, Icon as IconComp } from "@jundao/design";
import { Space } from "../components";

export default {
	title: "Components/Switch",
	argTypes: {
		onClick: { action: "onClick" },
		onChange: { action: "onChange" },
		size: {
			control: { type: "select" },
			options: ["small", "default", "large"],
		},
		disabled: { control: "boolean" },
		checked: { control: "boolean" },
		defaultChecked: { control: "boolean" },
		checkedChildren: { control: "text" },
		uncheckedChildren: { control: "text" },
	},
};

const Template = (props) => {
	return <Switch {...props} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const Text = Template.bind({});
Text.args = { checkedChildren: "on", uncheckedChildren: "off" };

export const Icon = Template.bind({});
Icon.args = {
	checkedChildren: <IconComp icon="check" line label="Checked" />,
	uncheckedChildren: <IconComp icon="close" line label="Unchecked" />,
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
