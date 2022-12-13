import { Checkbox, Text, Button } from "@jundao/design";
import { Space } from "../components";
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
		defaultChecked: { control: "boolean" },
	},
};

const Template = (props) => {
	return <Checkbox {...props} />;
};

export const Default = Template.bind({});
Default.args = {};

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
	const [{ indeterminate: indeterminateProp, onChange }, others] = splitProps(
		props,
		["indeterminate", "onChange"],
	);

	const [indeterminate, setIndeterminate] = createSignal(indeterminateProp);
	const [checked, setChecked] = createSignal(false);

	const changeHandler = (value) => {
		setChecked(value);
		setIndeterminate(false);
		if (typeof onChange === "function") onChange(value);
	};

	return (
		<Space vertical align="start">
			<Space>
				<Checkbox
					indeterminate={indeterminate()}
					onChange={changeHandler}
					checked={checked()}
					{...others}
				/>
				<Button
					type="primary"
					size="small"
					onClick={() => {
						setIndeterminate(true);
						setChecked(false);
					}}
				>
					Set Indeterminate
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
Indeterminate.args = { indeterminate: true };
