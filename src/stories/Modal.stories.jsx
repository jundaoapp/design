import { Modal, Button } from "@jundao/design";
import { createSignal } from "solid-js";

export default {
	title: "Components/Modal",
	argTypes: {
		title: { control: "text" },
		children: { control: "text" },
	},
};

const lipsum =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod aliquet purus eget feugiat. Fusce placerat maximus diam eu interdum. Aliquam sed quam at tortor interdum cursus. Nunc lacinia velit mi, sit amet tincidunt neque commodo quis. Nunc turpis augue, scelerisque sit amet luctus et, pharetra rhoncus diam. Proin dignissim enim quis risus placerat condimentum. Suspendisse vel cursus arcu. Suspendisse iaculis porttitor ipsum eget viverra. Vivamus lacus sem, convallis sit amet commodo in, venenatis in enim. Vivamus at convallis dui. Sed mauris diam, dapibus non lorem vitae, fermentum congue justo. Nulla facilisi. Phasellus id mauris vel metus consectetur ornare ac et enim. ";

const Template = (props) => {
	const [open, setOpen] = createSignal(false);

	return (
		<>
			<Button onClick={() => setOpen(true)} loading={open()}>
				Open Modal
			</Button>
			<Modal open={open()} onOpenChange={setOpen} {...props} />
		</>
	);
};

export const Default = Template.bind({});
Default.args = { title: "Modal Title", children: lipsum };

const FooterTemplate = (props) => {
	const [open, setOpen] = createSignal(false);

	return (
		<>
			<Button onClick={() => setOpen(true)} loading={open()}>
				Open Modal
			</Button>
			<Modal
				open={open()}
				onOpenChange={setOpen}
				footer={
					<>
						<Button autofocus onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button type="primary" danger onClick={() => setOpen(false)}>
							Delete
						</Button>
					</>
				}
				{...props}
			/>
		</>
	);
};

export const Footer = FooterTemplate.bind({});
Footer.args = {
	title: "Delete file",
	children: "Are you sure you want to delete this file?",
};

const MultpileTriggersTemplate = (props) => {
	const [open, setOpen] = createSignal(false);

	return (
		<>
			<Button onClick={() => setOpen(true)} loading={open()}>
				Open Modal
			</Button>

			<div style={{ "margin-left": "40rem" }}>
				<Button onClick={() => setOpen(true)} loading={open()}>
					Open Modal
				</Button>
			</div>

			<div style={{ margin: "30rem 0 0 25rem" }}>
				<Button onClick={() => setOpen(true)} loading={open()}>
					Open Modal
				</Button>
			</div>

			<Modal open={open()} onOpenChange={setOpen} {...props} />
		</>
	);
};

export const MultpileTriggers = MultpileTriggersTemplate.bind({});
MultpileTriggers.args = {
	title: "Same Modal",
	children: "Opens the same modal from different sources.",
};

const NestedTemplate = (props) => {
	const [open, setOpen] = createSignal(false);
	const [open1, setOpen1] = createSignal(false);
	const [open2, setOpen2] = createSignal(false);

	return (
		<>
			<Button onClick={() => setOpen(true)} loading={open()}>
				Open Modal
			</Button>
			<Modal
				open={open()}
				onOpenChange={setOpen}
				{...props}
				title="Modal Title"
				footer={
					<Button onClick={() => setOpen1(true)} loading={open1()}>
						Open Modal
					</Button>
				}
			>
				<Modal
					open={open1()}
					onOpenChange={setOpen1}
					{...props}
					title="Modal Title"
					footer={
						<Button onClick={() => setOpen2(true)} loading={open2()}>
							Open Modal
						</Button>
					}
				>
					<Modal open={open2()} onOpenChange={setOpen2} {...props} />
				</Modal>
			</Modal>
		</>
	);
};

export const Nested = NestedTemplate.bind({});
Nested.args = {
	title: "Deep Nested Modal",
	children: "This is a nested modal.",
};
