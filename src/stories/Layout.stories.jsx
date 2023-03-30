import { Layout, Button, useLayoutContext, Space } from "@jundao/design";

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
			style={{ height: "600px", width: "300px" }}
		/>
	);
};

export const Mobile = MobileTemplate.bind({});
Mobile.args = {};

const ScrollControlledTemplate = (props) => {
	const context = useLayoutContext();

	const [_ignored, setLeftSidebarOpen] = context.sidebarLeftOpen;
	const [_ignored2, setRightSidebarOpen] = context.sidebarRightOpen;

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
					<Button onClick={() => setLeftSidebarOpen(false)}>Close Left</Button>
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
					<Space vertical align="center">
						<Button onClick={() => setLeftSidebarOpen(true)}>Open Left</Button>
						<Button onClick={() => setRightSidebarOpen(true)}>
							Open Right
						</Button>
					</Space>
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
					<Button onClick={() => setRightSidebarOpen(false)}>
						Close Right
					</Button>
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

export const ScrollControlled = ScrollControlledTemplate.bind({});
ScrollControlled.args = {};

const MobileControlledTemplate = (props) => {
	return (
		<iframe
			src="/iframe.html?args=&id=components-layout--scroll-controlled&viewMode=story"
			style={{ height: "600px", width: "300px" }}
		/>
	);
};

export const MobileControlled = MobileControlledTemplate.bind({});
MobileControlled.args = {};

const LongSidebarTemplate = (props) => {
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
						background: "var(--jdd-blue-2)",
					}}
				>
					<div
						style={{
							display: "flex",
							"justify-content": "space-between",
							"align-items": "center",
							"flex-direction": "column",
							height: "200vh",
							padding: "0 1rem",
						}}
					>
						<span>Top</span>
						<span>Long Sidebar Left</span>
						<span>Bottom</span>
					</div>
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
						background: "var(--jdd-blue-2)",
					}}
				>
					<div
						style={{
							display: "flex",
							"justify-content": "space-between",
							"align-items": "center",
							"flex-direction": "column",
							height: "200vh",
							padding: "0 1rem",
						}}
					>
						<span>Top</span>
						<span>Long Sidebar Right</span>
						<span>Bottom</span>
					</div>
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

export const LongSidebar = LongSidebarTemplate.bind({});
LongSidebar.args = {};

const MobileLongSidebarTemplate = (props) => {
	return (
		<iframe
			src="/iframe.html?args=&id=components-layout--long-sidebar&viewMode=story"
			style={{ height: "600px", width: "300px" }}
		/>
	);
};

export const MobileLongSidebar = MobileLongSidebarTemplate.bind({});
MobileLongSidebar.args = {};
