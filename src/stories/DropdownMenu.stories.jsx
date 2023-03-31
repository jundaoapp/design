import { DropdownMenu, Divider, Text, Button, Icon } from "@jundao/design";
import { createSignal } from "solid-js";

export default {
	title: "Components/DropdownMenu",
	argTypes: {
		label: { control: "text" },
	},
};

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

			<DropdownMenu.Item
				icon={<Icon icon="file-edit" line />}
				shortcut="Ctrl+S"
			>
				Item 3
			</DropdownMenu.Item>
			<DropdownMenu.Item
				icon={<Icon icon="folder-add" line />}
				description="Description of item 4"
			>
				Item 4
			</DropdownMenu.Item>

			<DropdownMenu.Submenu icon={<Icon icon="share-forward" />} label="Item 5">
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
