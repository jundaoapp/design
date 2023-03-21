import { ContextMenu, Divider, Text, Icon } from "@jundao/design";
import { createSignal } from "solid-js";

export default {
	title: "Components/ContextMenu",
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
		<ContextMenu
			menu={
				<>
					<ContextMenu.Item>Item 1</ContextMenu.Item>
					<ContextMenu.Item
						description="Description of item 2"
						shortcut="Ctrl+A"
					>
						Item 2
					</ContextMenu.Item>

					<ContextMenu.Item
						icon={<Icon icon="file-edit" line />}
						shortcut="Ctrl+S"
					>
						Item 3
					</ContextMenu.Item>
					<ContextMenu.Item
						icon={<Icon icon="folder-add" line />}
						description="Description of item 4"
					>
						Item 4
					</ContextMenu.Item>

					<ContextMenu.Submenu
						icon={<Icon icon="share-forward" />}
						label="Item 5"
					>
						<ContextMenu.Item>Item 5.1</ContextMenu.Item>
						<ContextMenu.Item description="Description of item 5.2">
							Item 5.2
						</ContextMenu.Item>
					</ContextMenu.Submenu>

					<ContextMenu.Submenu
						label="Item 6"
						description="Description of item 6"
					>
						<ContextMenu.Group label="Group">
							<ContextMenu.RadioGroup
								value={radioValue1()}
								onChange={setRadioValue1}
							>
								<ContextMenu.Radio value="6.1">Item 6.1</ContextMenu.Radio>
								<ContextMenu.Radio
									value="6.2"
									description="Description of item 6.2"
								>
									Item 6.2
								</ContextMenu.Radio>
							</ContextMenu.RadioGroup>
						</ContextMenu.Group>

						<Divider />

						<ContextMenu.Checkbox checked={checked1()} onChange={setChecked1}>
							Item 6.3
						</ContextMenu.Checkbox>
						<ContextMenu.Checkbox
							checked={checked2()}
							onChange={setChecked2}
							description="Description of item 6.4"
						>
							Item 6.4
						</ContextMenu.Checkbox>
					</ContextMenu.Submenu>

					<Divider />

					<ContextMenu.Group label="Group">
						<ContextMenu.Item>Item 7</ContextMenu.Item>
						<ContextMenu.Item disabled>Item 8</ContextMenu.Item>
					</ContextMenu.Group>

					<Divider />

					<ContextMenu.RadioGroup
						value={radioValue2()}
						onChange={setRadioValue2}
					>
						<ContextMenu.Radio value="9" shortcut="Ctrl+H">
							Item 9
						</ContextMenu.Radio>
						<ContextMenu.Radio value="10" description="Description of item 10">
							Item 10
						</ContextMenu.Radio>
					</ContextMenu.RadioGroup>

					<Divider />

					<ContextMenu.Checkbox
						checked={checked3()}
						onChange={setChecked3}
						shortcut="Alt+Shift+F"
					>
						Item 11
					</ContextMenu.Checkbox>
					<ContextMenu.Checkbox
						checked={checked4()}
						onChange={setChecked4}
						description="Description of item 12"
					>
						Item 12
					</ContextMenu.Checkbox>
				</>
			}
			{...props}
		>
			<div
				style={{
					display: "flex",
					"justify-content": "center",
					"align-items": "center",
					width: "100%",
					height: "30rem",
					"box-sizing": "border-box",
					margin: "1rem",
					border: "1px dashed var(--jdd-gray-6)",
				}}
			>
				<Text>Right Click Here</Text>
			</div>
		</ContextMenu>
	);
};

export const Default = Template.bind({});
Default.args = {};
