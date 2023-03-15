import { Dropdown, Divider, Text, Button, Icon } from "@jundao/design";
import { createSignal } from "solid-js";

export default {
	title: "Components/Dropdown",
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
		<Dropdown {...props}>
			<Dropdown.Item>Item 1</Dropdown.Item>
			<Dropdown.Item description="Description of item 2" shortcut="Ctrl+A">
				Item 2
			</Dropdown.Item>

			<Dropdown.Item icon={<Icon icon="file-edit" line />} shortcut="Ctrl+S">
				Item 3
			</Dropdown.Item>
			<Dropdown.Item
				icon={<Icon icon="folder-add" line />}
				description="Description of item 4"
			>
				Item 4
			</Dropdown.Item>

			<Dropdown.Submenu icon={<Icon icon="share-forward" />} label="Item 5">
				<Dropdown.Item>Item 5.1</Dropdown.Item>
				<Dropdown.Item description="Description of item 5.2">
					Item 5.2
				</Dropdown.Item>
			</Dropdown.Submenu>

			<Dropdown.Submenu label="Item 6" description="Description of item 6">
				<Dropdown.Group label="Group">
					<Dropdown.RadioGroup value={radioValue1()} onChange={setRadioValue1}>
						<Dropdown.Radio value="6.1">Item 6.1</Dropdown.Radio>
						<Dropdown.Radio value="6.2" description="Description of item 6.2">
							Item 6.2
						</Dropdown.Radio>
					</Dropdown.RadioGroup>
				</Dropdown.Group>

				<Divider />

				<Dropdown.Checkbox checked={checked1()} onChange={setChecked1}>
					Item 6.3
				</Dropdown.Checkbox>
				<Dropdown.Checkbox
					checked={checked2()}
					onChange={setChecked2}
					description="Description of item 6.4"
				>
					Item 6.4
				</Dropdown.Checkbox>
			</Dropdown.Submenu>

			<Divider />

			<Dropdown.Group label="Group">
				<Dropdown.Item>Item 7</Dropdown.Item>
				<Dropdown.Item disabled>Item 8</Dropdown.Item>
			</Dropdown.Group>

			<Divider />

			<Dropdown.RadioGroup value={radioValue2()} onChange={setRadioValue2}>
				<Dropdown.Radio value="9" shortcut="Ctrl+H">
					Item 9
				</Dropdown.Radio>
				<Dropdown.Radio value="10" description="Description of item 10">
					Item 10
				</Dropdown.Radio>
			</Dropdown.RadioGroup>

			<Divider />

			<Dropdown.Checkbox
				checked={checked3()}
				onChange={setChecked3}
				shortcut="Alt+Shift+F"
			>
				Item 11
			</Dropdown.Checkbox>
			<Dropdown.Checkbox
				checked={checked4()}
				onChange={setChecked4}
				description="Description of item 12"
			>
				Item 12
			</Dropdown.Checkbox>
		</Dropdown>
	);
};

export const Default = Template.bind({});
Default.args = { label: "Dropdown" };

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
