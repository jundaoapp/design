import { Avatar, Badge, Space, Switch } from "@jundao/design";
import { createSignal } from "solid-js";

export default {
	title: "Components/Badge",
	argTypes: {
		status: {
			control: { type: "select" },
			options: ["success", "default", "error", "warning"],
		},
		href: { control: "text" },
		max: { control: "number" },
		count: { control: "number" },
		loading: { control: "boolean" },
		showZero: { control: "boolean" },
		text: { control: "string" },
		title: { control: "text" },
	},
};

const Template = (props) => {
	const [show, setShow] = createSignal(true);

	return (
		<Space vertical align="start">
			<div
				style={{
					"min-height": "2rem",
					display: "flex",
					"align-items": "center",
				}}
			>
				<Badge show={show()} {...props} />
			</div>
			<Badge show={show()} {...props}>
				<Avatar />
			</Badge>
			<Badge show={show()} {...props}>
				<Avatar shape="square" />
			</Badge>

			<Switch
				checked={show()}
				onChange={setShow}
				checkedChildren={"show"}
				uncheckedChildren={"hide"}
			/>
		</Space>
	);
};

export const Default = Template.bind({});
Default.args = {};

export const Success = Template.bind({});
Success.args = { status: "success" };

export const Error_ = Template.bind({});
Error_.args = { status: "error" };

export const Warning = Template.bind({});
Warning.args = { status: "warning" };

export const Link = Template.bind({});
Link.args = { href: "#" };

export const Count = Template.bind({});
Count.args = { count: 4 };

export const Max = Template.bind({});
Max.args = { max: 9, count: 10 };

export const ShowZero = Template.bind({});
ShowZero.args = { count: 0, showZero: true };

export const Loading = Template.bind({});
Loading.args = { loading: true };

export const LoadingCount = Template.bind({});
LoadingCount.args = { loading: true, count: 4 };

export const Text = Template.bind({});
Text.args = { text: "Text" };

export const Title = Template.bind({});
Title.args = { title: "Title" };
