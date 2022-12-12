import { Card, Text } from "@jundao/design";

export default {
	title: "Components/Card",
	argTypes: {
		title: { control: "text" },
		size: {
			control: { type: "select" },
			options: ["small", "default"],
		},
	},
};

const Template = (props) => (
	<Card {...props} style={{ width: "16rem" }}>
		<Text>Card content</Text>
		<br />
		<Text>Card content</Text>
		<br />
		<Text>Card content</Text>
		<br />
	</Card>
);

export const Default = Template.bind({});
Default.args = { title: "Card Title" };

export const Small = Template.bind({});
Small.args = { size: "small", title: "Card Title" };

export const NoTitle = Template.bind({});

export const NoPadding = Template.bind({});
NoPadding.args = { title: "Card Title", noPadding: true };
