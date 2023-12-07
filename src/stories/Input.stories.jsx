import { Input } from "@jundao/design";

export default {
	title: "Components/Input",
	argTypes: {
		label: { control: "text" },
		description: { control: "text" },
		errorMessage: { control: "text" },
		onChange: { action: "onChange" },
		type: {
			control: { type: "select" },
			options: ["text", "textarea"],
		},
		size: {
			control: { type: "select" },
			options: ["small", "default", "large"],
		},
		disabled: { control: "boolean" },
		danger: { control: "boolean" },
		required: { control: "boolean" },
		autofocus: { control: "boolean" },
	},
};

const Template = (props) => {
	return <Input {...props} />;
};

export const Default = Template.bind({});
Default.args = {
	placeholder: "Type here",
};

export const Label = Template.bind({});
Label.args = {
	label: "Input",
	placeholder: "Type here",
};

export const Description = Template.bind({});
Description.args = {
	description: "This is the description of the input.",
	placeholder: "Type here",
};

export const ErrorMessage = Template.bind({});
ErrorMessage.args = {
	errorMessage: "Invalid option",
	invalid: true,
	placeholder: "Type here",
};

export const Full = Template.bind({});
Full.args = {
	label: "Label",
	description: "This is the description of the input.",
	errorMessage: "Invalid option",
	invalid: true,
	placeholder: "Type here",
};

export const TextArea = Template.bind({});
TextArea.args = {
	placeholder: "Type here",
	type: "textarea",
};
