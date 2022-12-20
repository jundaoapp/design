import { Icon, Title, Text } from "@jundao/design";

export default {
	title: "Components/Typography/Icon",
	argTypes: {
		icon: { control: "text" },
		line: { control: "boolean" },
		spin: { control: "boolean" },
		label: { control: "text" },
	},
};

const Template = (props) => {
	return (
		<>
			<Title>Remix Icon</Title>
			<Text>
				Jundao Design uses Remix Icon, the icon prop is the name of the icon.
				The size is linked to the current font-size.
			</Text>
			<div
				style={{
					"margin-top": "1rem",
					display: "flex",
					gap: ".25rem",
					"font-size": "2rem",
				}}
			>
				<Text>
					<Icon {...props} />
					<Icon icon="home" line label="Home" />
					<Icon icon="terminal-box" label="Terminal" />
					<Icon icon="loader-5" line spin label="loading" />
				</Text>
			</div>
		</>
	);
};

export const Default = Template.bind({});
Default.args = { icon: "html5" };
