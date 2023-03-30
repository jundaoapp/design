import { Layout } from "@jundao/design";

export default {
	title: "Components/Layout",
	argTypes: {},
};

const Template = (props) => {
	return (
		<Layout style={{ "min-width": "90vw", "min-height": "90vh" }}>
			<Layout.Header
				style={{
					display: "flex",
					"justify-content": "center",
					"align-items": "center",
					background: "var(--jdd-blue-3)",
					padding: "1rem",
				}}
			>
				Header
			</Layout.Header>
			<Layout.Sidebar
				style={{
					display: "flex",
					"justify-content": "center",
					"align-items": "center",
					background: "var(--jdd-blue-2)",
					padding: "1rem",
				}}
			>
				Sidebar Left
			</Layout.Sidebar>
			<Layout.Content
				style={{
					display: "flex",
					"justify-content": "center",
					"align-items": "center",
					background: "var(--jdd-blue-4)",
					padding: "1rem",
				}}
			>
				Content
			</Layout.Content>
			<Layout.Sidebar
				position="right"
				style={{
					display: "flex",
					"justify-content": "center",
					"align-items": "center",
					background: "var(--jdd-blue-2)",
					padding: "1rem",
				}}
			>
				Sidebar Right
			</Layout.Sidebar>
			<Layout.Footer
				style={{
					display: "flex",
					"justify-content": "center",
					"align-items": "center",
					background: "var(--jdd-blue-3)",
					padding: "1rem",
				}}
			>
				Footer
			</Layout.Footer>
		</Layout>
	);
};

export const Default = Template.bind({});
Default.args = {};

const ScrollTemplate = (props) => {
	return (
		<>
			<style>
				{`
			.sb-main-padded {
			  padding: 0 !important;
			}
			`}
			</style>
			<Layout>
				<Layout.Header
					style={{
						display: "flex",
						"justify-content": "center",
						"align-items": "center",
						background: "var(--jdd-blue-3)",
						padding: "1rem",
					}}
				>
					Header
				</Layout.Header>
				<Layout.Sidebar
					style={{
						display: "flex",
						"justify-content": "center",
						"align-items": "center",
						background: "var(--jdd-blue-2)",
						padding: "1rem",
					}}
				>
					Sidebar Left
				</Layout.Sidebar>
				<Layout.Content
					style={{
						display: "flex",
						"justify-content": "center",
						"align-items": "center",
						background: "var(--jdd-blue-4)",
						padding: "1rem",
						height: "200vh",
					}}
				>
					Content
				</Layout.Content>
				<Layout.Sidebar
					position="right"
					style={{
						display: "flex",
						"justify-content": "center",
						"align-items": "center",
						background: "var(--jdd-blue-2)",
						padding: "1rem",
					}}
				>
					Sidebar Right
				</Layout.Sidebar>
				<Layout.Footer
					style={{
						display: "flex",
						"justify-content": "center",
						"align-items": "center",
						background: "var(--jdd-blue-3)",
						padding: "1rem",
					}}
				>
					Footer
				</Layout.Footer>
			</Layout>
		</>
	);
};

export const Scroll = ScrollTemplate.bind({});
Scroll.args = {};

const MobileTemplate = (props) => {
	return (
		<iframe
			src="/iframe.html?args=&id=components-layout--scroll&viewMode=story"
			style={{ height: "90vh" }}
		/>
	);
};

export const Mobile = MobileTemplate.bind({});
Mobile.args = {};
