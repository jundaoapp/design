import { Radio, Space, Divider, Text } from "@jundao/design";
import { createSignal, splitProps } from "solid-js";

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
		autofocus: { control: "boolean" },
	},
};

const Template = (props) => {
	return (
		<Radio.Group>
			<Radio {...props} />
		</Radio.Group>
	);
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
	<Radio.Group>
		<Space vertical>
			<Radio size="small" value="value 1" />
			<Radio {...props} />
			<Radio size="large" value="value 3" />
		</Space>
	</Radio.Group>
);

export const Label = Template.bind({});
Label.args = { label: "Label", value: "value" };

export const Autofocus = Template.bind({});
Autofocus.args = { autofocus: true };

const GroupPropsTemplate = (props) => {
	return (
		<Radio.Group {...props}>
			<Radio label="Label 1" value="value 1" />
			<Radio label="Label 2" value="value 2" />
			<Radio label="Label 3" value="value 3" />
		</Radio.Group>
	);
};

export const GroupLabel = GroupPropsTemplate.bind({});
GroupLabel.args = { label: "Group Label" };

export const GroupDescription = GroupPropsTemplate.bind({});
GroupDescription.args = { description: "Group description" };

export const GroupError = GroupPropsTemplate.bind({});
GroupError.args = { errorMessage: "Group error", validationState: "invalid" };

const GroupTemplate = (props) => {
	const [local, others] = splitProps(props, ["onChange"]);
	const [value, setValue] = createSignal();

	const changeHandler = (value) => {
		setValue(value);

		if (typeof local.onChange === "function") local.onChange(value);
	};

	return (
		<Space>
			<Radio.Group onChange={changeHandler} orientation="vertical">
				<Radio value="value 1" label="Label 1" />
				<Radio {...others} />
				<Radio value="value 3" label="Label 3" />
			</Radio.Group>
			<Divider vertical />
			<Text italic={value() === undefined}>
				{value() === undefined ? "undefined" : value()}
			</Text>
		</Space>
	);
};

export const RadioGroup = GroupTemplate.bind({});
RadioGroup.args = { value: "value 2", label: "Label 2" };
