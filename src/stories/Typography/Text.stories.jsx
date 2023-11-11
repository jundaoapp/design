import { Space, Text } from "@jundao/design";

export default {
	title: "Components/Typography/Text",
	argTypes: {
		children: { control: "text" },
		type: {
			control: { type: "select" },
			options: ["default", "secondary", "success", "warning", "danger"],
		},
		underline: { control: "boolean" },
		delete: { control: "boolean" },
		bold: { control: "boolean" },
		italic: { control: "boolean" },
		mark: { control: "boolean" },
		code: { control: "boolean" },
		keyboard: { control: "boolean" },
	},
};

const Template = (props) => {
	return (
		<Space vertical align="start">
			<Text {...props} />
			<Text>Jundao Design (default)</Text>
			<Text type="secondary">Jundao Design (secondary)</Text>
			<Text type="success">Jundao Design (success)</Text>
			<Text type="warning">Jundao Design (warning)</Text>
			<Text type="danger">Jundao Design (danger)</Text>
			<Text underline>Jundao Design (underline)</Text>
			<Text delete>Jundao Design (delete)</Text>
			<Text bold>Jundao Design (bold)</Text>
			<Text italic>Jundao Design (italic)</Text>
			<Text mark>Jundao Design (mark)</Text>
			<Text code>Jundao Design (code)</Text>
			<Text keyboard>Jundao Design (keyboard)</Text>
			<Text size="small">Jundao Design (small)</Text>
			<Text size="large">Jundao Design (large)</Text>
		</Space>
	);
};

export const Default = Template.bind({});
Default.args = { children: "Jundao Design" };
