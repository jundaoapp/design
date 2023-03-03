import { Dropdown, Divider, Text, Button } from "@jundao/design";
import { createSignal } from "solid-js";

export default {
	title: "Components/Dropdown",
	argTypes: {
		label: { control: "text" },
	},
};

const Template = (props) => {
	const [radioValue1, setRadioValue1] = createSignal("4.1");
	const [radioValue2, setRadioValue2] = createSignal("7");
	const [checked1, setChecked1] = createSignal(true);
	const [checked2, setChecked2] = createSignal(false);
	const [checked3, setChecked3] = createSignal(true);
	const [checked4, setChecked4] = createSignal(false);

	return (
		<Dropdown {...props}>
			<Dropdown.Item>Item 1</Dropdown.Item>
			<Dropdown.Item description="Description of item 2">Item 2</Dropdown.Item>

			<Dropdown.Submenu label="Item 3">
				<Dropdown.Item>Item 3.1</Dropdown.Item>
				<Dropdown.Item description="Description of item 3.2">
					Item 3.2
				</Dropdown.Item>
			</Dropdown.Submenu>

			<Dropdown.Submenu label="Item 4" description="Description of item 4">
				<Dropdown.Group label="Group">
					<Dropdown.RadioGroup value={radioValue1()} onChange={setRadioValue1}>
						<Dropdown.Radio value="4.1">Item 4.1</Dropdown.Radio>
						<Dropdown.Radio value="4.2" description="Description of item 4.2">
							Item 4.2
						</Dropdown.Radio>
					</Dropdown.RadioGroup>
				</Dropdown.Group>

				<Divider />

				<Dropdown.Checkbox checked={checked1()} onChange={setChecked1}>
					Item 4.3
				</Dropdown.Checkbox>
				<Dropdown.Checkbox
					checked={checked2()}
					onChange={setChecked2}
					description="Description of item 4.4"
				>
					Item 4.4
				</Dropdown.Checkbox>
			</Dropdown.Submenu>

			<Divider />

			<Dropdown.Group label="Group">
				<Dropdown.Item>Item 5</Dropdown.Item>
				<Dropdown.Item disabled>Item 6</Dropdown.Item>
			</Dropdown.Group>

			<Divider />

			<Dropdown.RadioGroup value={radioValue2()} onChange={setRadioValue2}>
				<Dropdown.Radio value="7">Item 7</Dropdown.Radio>
				<Dropdown.Radio value="8" description="Description of item 8">
					Item 8
				</Dropdown.Radio>
			</Dropdown.RadioGroup>

			<Divider />

			<Dropdown.Checkbox checked={checked3()} onChange={setChecked3}>
				Item 9
			</Dropdown.Checkbox>
			<Dropdown.Checkbox
				checked={checked4()}
				onChange={setChecked4}
				description="Description of item 10"
			>
				Item 10
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
