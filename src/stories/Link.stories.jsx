import { Link } from "@jundao/design";

export default {
	title: "Components/Link",
	argTypes: {
		children: { control: "string" },
		href: { control: "string" },
		target: {
			control: { type: "select" },
			options: ["_blank", "_self", "_parent", "_top"],
		},
		disabled: { control: "boolean" },
		type: {
			control: { type: "select" },
			options: ["default", "secondary", "success", "warning", "danger"],
		},
	},
};

const Template = (props) => {
	return <Link {...props} />;
};

export const Default = Template.bind({});
Default.args = { children: "Jundao Design (link)", href: "https://jundao.app" };

export const Disabled = Template.bind({});
Disabled.args = {
	children: "Jundao Design (link)",
	href: "https://jundao.app",
	disabled: true,
};

export const Blank = Template.bind({});
Blank.args = {
	children: "Jundao Design (link)",
	href: "https://jundao.app",
	target: "_blank",
};
