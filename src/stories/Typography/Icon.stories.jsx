import { Link, Text, Title } from "@jundao/design";

export default {
	title: "Components/Typography/Icon",
	argTypes: {
		title: { control: "text" },
	},
};

// Solid Icons get treeshaken by mistake
function RiBuildingsHomeFill(props) {
	return (
		<svg
			fill="currentColor"
			stroke-width="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			style="overflow: visible; color: currentcolor;"
			height="1em"
			width="1em"
		>
			<path
				fill="currentColor"
				d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.489a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79v10.51Z"
			/>
		</svg>
	);
}
function RiDevelopmentTerminalBoxFill(props) {
	return (
		<svg
			fill="currentColor"
			stroke-width="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			style="overflow: visible; color: currentcolor;"
			height="1em"
			width="1em"
		>
			<path
				fill="currentColor"
				d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm9 12v2h6v-2h-6Zm-3.586-3-2.828 2.828L7 16.243 11.243 12 7 7.757 5.586 9.172 8.414 12Z"
			/>
		</svg>
	);
}
function RiSystemLoader5Line(props) {
	return (
		<svg
			fill="currentColor"
			stroke-width="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			style="overflow: visible; color: currentcolor;"
			height="1em"
			width="1em"
		>
			<path fill="currentColor" d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3Z" />
		</svg>
	);
}

const Template = (props) => {
	return (
		<>
			<Title>Remix Icon</Title>
			<Text>
				Jundao Design uses Remix Icon with{" "}
				<Link href="https://solid-icons.vercel.app/search/package/ri">
					Solid Icons
				</Link>
				.
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
					<RiBuildingsHomeFill {...props} />
					<RiDevelopmentTerminalBoxFill title="Terminal" />
					<RiSystemLoader5Line title="loading" />
				</Text>
			</div>
		</>
	);
};

export const Default = Template.bind({});
Default.args = { title: "Icon Title" };
