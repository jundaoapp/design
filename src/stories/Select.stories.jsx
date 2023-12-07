import { Select } from "@jundao/design";

export default {
	title: "Components/Select",
	argTypes: {
		label: { control: "text" },
		onChange: { action: "onChange" },
		placeholder: { control: "text" },
		description: { control: "text" },
		errorMessage: { control: "text" },
		invalid: { control: "boolean" },
		tags: { control: "boolean" },
	},
};

const Template = (props) => {
	return <Select style={{ width: "10rem" }} {...props} />;
};

export const Default = Template.bind({});
Default.args = {
	placeholder: "Select an item",
	options: ["Item 1", "Item 2", "Item 3"],
};

export const Label = Template.bind({});
Label.args = {
	label: "Label",
	placeholder: "Select an item",
	options: ["Item 1", "Item 2", "Item 3"],
};

export const Description = Template.bind({});
Description.args = {
	description: "This is the description of the select.",
	placeholder: "Select an item",
	options: ["Item 1", "Item 2", "Item 3"],
};

export const ErrorMessage = Template.bind({});
ErrorMessage.args = {
	errorMessage: "Invalid option",
	invalid: true,
	placeholder: "Select an item",
	options: ["Item 1", "Item 2", "Item 3"],
};

export const Full = Template.bind({});
Full.args = {
	label: "Label",
	description: "This is the description of the select.",
	errorMessage: "Invalid option",
	invalid: true,
	placeholder: "Select an item",
	options: ["Item 1", "Item 2", "Item 3"],
};

const MultiTemplate = (props) => {
	return <Select multiple {...props} />;
};

export const Multi = MultiTemplate.bind({});
Multi.args = {
	placeholder: "Select items",
	options: ["Item 1", "Item 2", "Item 3"],
};

export const Tags = MultiTemplate.bind({});
Tags.args = {
	placeholder: "Select items",
	options: ["Item 1", "Item 2", "Item 3"],
	tags: true,
};
