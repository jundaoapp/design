import { Divider } from "@jundao/design";
import { Text } from "../components";

export default {
	title: "Components/Divider",
	argTypes: {
		children: { control: "text" },
		vertical: { control: "boolean" },
		dashed: { control: "boolean" },
		orientation: { control: { type: "select" }, options: ["left", "right"] },
	},
};

const Template = (props) => {
	return (
		<>
			<Text>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
				merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
				quo modo.
			</Text>
			<Divider {...props} />
			<Text>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
				merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen,
				quo modo.
			</Text>
		</>
	);
};

export const Default = Template.bind({});
Default.args = {};

export const Dashed = Template.bind({});
Dashed.args = { dashed: true };

export const WithText = Template.bind({});
WithText.args = { children: "Text" };

export const WithTextLeft = Template.bind({});
WithTextLeft.args = { children: "Text", orientation: "left" };

export const WithTextRight = Template.bind({});
WithTextRight.args = { children: "Text", orientation: "right" };

const VerticalTemplate = (props) => {
	return (
		<>
			<Text>Text</Text>
			<Divider {...props} />
			<Text>Text</Text>
		</>
	);
};

export const Vertical = VerticalTemplate.bind({});
Vertical.args = { vertical: true };
