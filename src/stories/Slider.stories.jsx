import { Slider } from "@jundao/design";
import { mergeProps } from "solid-js";

export default {
	title: "Components/Slider",
	argTypes: {
		min: { control: "number" },
		max: { control: "number" },
		defaultValue: { control: "number" },
		value: { control: "number" },
		step: { control: "number" },
		disabled: { control: "boolean" },
		onChange: { action: "onChange" },
		onInput: { action: "onInput" },
	},
};

const Template = (props) => (
	<div style={{ width: "20rem" }}>
		<Slider {...props} />
	</div>
);

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const Controlled = Template.bind({});
Controlled.args = { value: 40 };

export const Min = Template.bind({});
Min.args = { min: 40 };

export const Max = Template.bind({});
Max.args = { max: 40 };

export const DefaultValue = Template.bind({});
DefaultValue.args = { defaultValue: 80 };

export const Step = Template.bind({});
Step.args = { step: 10 };

export const Label = Template.bind({});
Label.args = { label: "Label" };
