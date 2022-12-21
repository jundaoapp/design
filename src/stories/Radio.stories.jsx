import { Radio, Space } from "@jundao/design";
import { splitProps } from "solid-js";

export default {
	title: "Components/Radio",
	argTypes: {
		onClick: { action: "onClick" },
		onChange: { action: "onChange" },
		size: {
			control: { type: "select" },
			options: ["small", "default", "large"],
		},
		disabled: { control: "boolean" },
		checked: { control: "boolean" },
		danger: { control: "boolean" },
		label: { control: "text" },
		value: { control: "text" },
	},
};

const Template = (props) => {
	return <Radio {...props} />;
};

export const Default = Template.bind({});
Default.args = { value: "value" };

export const Danger = Template.bind({});
Danger.args = { danger: true, value: "value" };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true, value: "value" };

export const Large = Template.bind({});
Large.args = { size: "large", value: "value" };

export const Small = Template.bind({});
Small.args = { size: "small", value: "value" };

export const All = (props) => (
	<Space vertical>
		<Radio size="small" value="value" />
		<Radio {...props} />
		<Radio size="large" value="value" />
	</Space>
);

export const Label = Template.bind({});
Label.args = { label: "Label", value: "value" };

const RadioGroupTemplate = (props) => {
	const [local, others] = splitProps(props, ["onChange"]);

	return (
		<Radio.Group onChange={local.onChange}>
			<Space vertical align="start">
				<Radio label="One" value="one" />
				<Radio {...others} />
				<Radio label="Three" value="three" />
			</Space>
		</Radio.Group>
	);
};

export const RadioGroup = RadioGroupTemplate.bind({});
RadioGroup.args = { label: "Two", value: "two" };
