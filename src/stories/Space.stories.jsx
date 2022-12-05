import { Button, Space, Text, Divider } from "@jundao/design";
import { For } from "solid-js";

export default {
	title: "Components/Space",
	argTypes: {
		vertical: { control: "boolean" },
		size: {
			control: { type: "select" },
			options: ["small", "medium", "large"],
		},
		wrap: { control: "boolean" },
		align: {
			control: { type: "select" },
			options: ["left", "center", "right"],
		},
	},
};

const Template = (props) => {
	const { vertical } = props;

	return (
		<>
			<Space {...props}>
				<Button>Button</Button>
				<Button>Button</Button>
				<Button>Button</Button>
				<Text>Text</Text>
				<Text>Text</Text>
				<Divider vertical={!vertical} />
				<Text>Text</Text>
			</Space>
		</>
	);
};

export const Default = Template.bind({});
Default.args = {};

export const Vertical = Template.bind({});
Vertical.args = { vertical: true };

export const Medium = Template.bind({});
Medium.args = { size: "medium" };

export const Large = Template.bind({});
Large.args = { size: "large" };

export const Left = Template.bind({});
Left.args = { vertical: true, align: "left" };

export const Right = Template.bind({});
Right.args = { vertical: true, align: "right" };

const WrapTemplate = (props) => {
	return (
		<div style={{ width: "40rem" }}>
			<Space {...props}>
				<For each={[...Array(10).keys()]} fallback={<div>Loading...</div>}>
					{() => <Button>Button</Button>}
				</For>
			</Space>
		</div>
	);
};

export const Wrap = WrapTemplate.bind({});
Wrap.args = { wrap: true };
