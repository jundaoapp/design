import { Space, Text, Spinner } from "@jundao/design";

export default {
	title: "Components/Spinner",
	argTypes: {
		label: { control: "text" },
		size: {
			control: { type: "select" },
			options: ["small", "default", "large"],
		},
	},
};

const Template = (props) => (
	<Text>
		<Spinner {...props} />
	</Text>
);

export const Default = Template.bind({});

export const Label = Template.bind({});
Label.args = { label: "saving" };

export const Small = Template.bind({});
Small.args = { size: "small" };

export const Large = Template.bind({});
Large.args = { size: "large" };

export const All = (props) => (
	<Space vertical>
		<Text>
			<Spinner size="small" />
		</Text>
		<Text>
			<Spinner {...props} />
		</Text>
		<Text>
			<Spinner size="large" />
		</Text>
	</Space>
);
