import { Space, Alert, Text, Button } from "@jundao/design";
import { mergeProps } from "solid-js";

export default {
	title: "Components/Alert",
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["success", "info", "error", "warning"],
		},
		message: { control: "text" },
		description: { control: "text" },
		closable: { control: "boolean" },
		showIcon: { control: "boolean" },
		loading: { control: "boolean" },
		banner: { control: "boolean" },
		onClose: { action: "onClick" },
	},
};

const Template = (props) => (
	<Space vertical style={{ width: "100%" }}>
		<Alert {...props} />
		<Alert {...props} banner />
	</Space>
);

export const Info = Template.bind({});
Info.args = { message: "This is an alert." };

export const Success = Template.bind({});
Success.args = { type: "success", message: "This is an alert." };

export const Error_ = Template.bind({});
Error_.args = { type: "error", message: "This is an alert." };

export const Warning = Template.bind({});
Warning.args = { type: "warning", message: "This is an alert." };

export const Description = Template.bind({});
Description.args = {
	message: "This is an alert.",
	description: "This is a detailed description of the alert.",
};

export const Closable = Template.bind({});
Closable.args = { message: "This is an alert.", closable: true };

export const NoIcon = Template.bind({});
NoIcon.args = { message: "This is an alert.", showIcon: false };

const CustomTemplate = (props) => (
	<Space vertical style={{ width: "100%" }}>
		<Alert
			{...props}
			message={
				<Space vertical>
					<Text>Custom Content</Text>
					<Space>
						<Button>OK</Button>
						<Button danger>Cancel</Button>
					</Space>
				</Space>
			}
		/>
		<Alert
			{...props}
			message={
				<Space vertical>
					<Text>Custom Content</Text>
					<Space>
						<Button>OK</Button>
						<Button danger>Cancel</Button>
					</Space>
				</Space>
			}
			banner
		/>
	</Space>
);

export const CustomContent = CustomTemplate.bind({});
