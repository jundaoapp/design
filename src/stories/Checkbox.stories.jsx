import { Space, Checkbox, Text, Button, Divider } from "@jundao/design";
import { createSignal, splitProps } from "solid-js";

export default {
	title: "Components/Checkbox",
	argTypes: {
		onClick: { action: "onClick" },
		onChange: { action: "onChange" },
		size: {
			control: { type: "select" },
			options: ["small", "default", "large"],
		},
		indeterminate: { control: "boolean" },
		disabled: { control: "boolean" },
		checked: { control: "boolean" },
		danger: { control: "boolean" },
		defaultChecked: { control: "boolean" },
		label: { control: "text" },
		autofocus: { control: "boolean" },
	},
};

const Template = (props) => {
	return <Checkbox {...props} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Danger = Template.bind({});
Danger.args = { danger: true };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const Large = Template.bind({});
Large.args = { size: "large" };

export const Small = Template.bind({});
Small.args = { size: "small" };

export const All = (props) => (
	<Space vertical>
		<Checkbox size="small" />
		<Checkbox {...props} />
		<Checkbox size="large" />
	</Space>
);

export const Controlled = Template.bind({});
Controlled.args = { checked: true };

const IndeterminateTemplate = (props) => {
	const [local, others] = splitProps(props, ["onChange"]);

	const [indeterminate, setIndeterminate] = createSignal(false);
	const [checked, setChecked] = createSignal(false);

	const changeHandler = (value) => {
		if (typeof local.onChange === "function") local.onChange(value);
		setChecked(value);
	};

	return (
		<Space vertical align="start">
			<Space>
				<Checkbox
					indeterminate={indeterminate()}
					onIndeterminateChange={setIndeterminate}
					onChange={changeHandler}
					{...others}
				/>
				<Button
					type="primary"
					size="small"
					onClick={() => {
						setIndeterminate(!indeterminate());
					}}
				>
					Toggle Indeterminate
				</Button>
			</Space>

			<Text>
				Checked: {checked().toString()}
				<br />
				Indeterminate: {indeterminate().toString()}
			</Text>
		</Space>
	);
};

export const Indeterminate = IndeterminateTemplate.bind({});

export const Label = Template.bind({});
Label.args = { label: "Label" };

export const Autofocus = Template.bind({});
Autofocus.args = { autofocus: true };
