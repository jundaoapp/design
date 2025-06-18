import { Button, Divider, DropdownMenu, Text } from "@jundao/design";
import { createSignal } from "solid-js";

export default {
	title: "Components/DropdownMenu",
	argTypes: {
		label: { control: "text" },
	},
};

// Solid Icons get treeshaken by mistake
function RiDocumentFileEditLine(props) {
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
				d="m21 6.757-2 2V4h-9v5H5v11h14v-2.757l2-2v5.765a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V8l6.003-6h10.995C20.55 2 21 2.455 21 2.992v3.765Zm.778 2.05 1.414 1.415L15.414 18l-1.416-.002.002-1.412 7.778-7.778Z"
			/>
		</svg>
	);
}
function RiDocumentFolderAddLine(props) {
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
				d="M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2ZM4 5v14h16V7h-8.414l-2-2H4Zm7 7V9h2v3h3v2h-3v3h-2v-3H8v-2h3Z"
			/>
		</svg>
	);
}
function RiSystemShareForwardFill(props) {
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
				d="M13 14h-2a8.999 8.999 0 0 0-7.968 4.81A10.133 10.133 0 0 1 3 18C3 12.477 7.477 8 13 8V3l10 8-10 8v-5Z"
			/>
		</svg>
	);
}

const Template = (props) => {
	const [radioValue1, setRadioValue1] = createSignal("4.1");
	const [radioValue2, setRadioValue2] = createSignal("9");
	const [checked1, setChecked1] = createSignal(true);
	const [checked2, setChecked2] = createSignal(false);
	const [checked3, setChecked3] = createSignal(true);
	const [checked4, setChecked4] = createSignal(false);

	return (
		<DropdownMenu {...props}>
			<DropdownMenu.Item>Item 1</DropdownMenu.Item>
			<DropdownMenu.Item description="Description of item 2" shortcut="Ctrl+A">
				Item 2
			</DropdownMenu.Item>

			<DropdownMenu.Item icon={<RiDocumentFileEditLine />} shortcut="Ctrl+S">
				Item 3
			</DropdownMenu.Item>
			<DropdownMenu.Item
				icon={<RiDocumentFolderAddLine />}
				description="Description of item 4"
			>
				Item 4
			</DropdownMenu.Item>

			<DropdownMenu.Submenu icon={<RiSystemShareForwardFill />} label="Item 5">
				<DropdownMenu.Item>Item 5.1</DropdownMenu.Item>
				<DropdownMenu.Item description="Description of item 5.2">
					Item 5.2
				</DropdownMenu.Item>
			</DropdownMenu.Submenu>

			<DropdownMenu.Submenu label="Item 6" description="Description of item 6">
				<DropdownMenu.Group label="Group">
					<DropdownMenu.RadioGroup
						value={radioValue1()}
						onChange={setRadioValue1}
					>
						<DropdownMenu.Radio value="6.1">Item 6.1</DropdownMenu.Radio>
						<DropdownMenu.Radio
							value="6.2"
							description="Description of item 6.2"
						>
							Item 6.2
						</DropdownMenu.Radio>
					</DropdownMenu.RadioGroup>
				</DropdownMenu.Group>

				<Divider />

				<DropdownMenu.Checkbox checked={checked1()} onChange={setChecked1}>
					Item 6.3
				</DropdownMenu.Checkbox>
				<DropdownMenu.Checkbox
					checked={checked2()}
					onChange={setChecked2}
					description="Description of item 6.4"
				>
					Item 6.4
				</DropdownMenu.Checkbox>
			</DropdownMenu.Submenu>

			<Divider />

			<DropdownMenu.Group label="Group">
				<DropdownMenu.Item>Item 7</DropdownMenu.Item>
				<DropdownMenu.Item disabled>Item 8</DropdownMenu.Item>
			</DropdownMenu.Group>

			<Divider />

			<DropdownMenu.RadioGroup value={radioValue2()} onChange={setRadioValue2}>
				<DropdownMenu.Radio value="9" shortcut="Ctrl+H">
					Item 9
				</DropdownMenu.Radio>
				<DropdownMenu.Radio value="10" description="Description of item 10">
					Item 10
				</DropdownMenu.Radio>
			</DropdownMenu.RadioGroup>

			<Divider />

			<DropdownMenu.Checkbox
				checked={checked3()}
				onChange={setChecked3}
				shortcut="Alt+Shift+F"
			>
				Item 11
			</DropdownMenu.Checkbox>
			<DropdownMenu.Checkbox
				checked={checked4()}
				onChange={setChecked4}
				description="Description of item 12"
			>
				Item 12
			</DropdownMenu.Checkbox>
		</DropdownMenu>
	);
};

export const Default = Template.bind({});
Default.args = { label: "Dropdown Menu" };

export const CustomTrigger = Template.bind({});
CustomTrigger.args = { customTrigger: <Text>Trigger</Text> };

const ButtonGroupTemplate = (props) => {
	return (
		<Button.Group>
			<Button>Button</Button>
			<Template {...props} />
		</Button.Group>
	);
};

export const ButtonGroup = ButtonGroupTemplate.bind({});
ButtonGroup.args = {};
