import { ContextMenu, Divider, Text } from "@jundao/design";
import { createSignal } from "solid-js";

export default {
	title: "Components/ContextMenu",
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
		<ContextMenu
			menu={
				<>
					<ContextMenu.Item>Item 1</ContextMenu.Item>
					<ContextMenu.Item description="Description of item 2">
						Item 2
					</ContextMenu.Item>

					<ContextMenu.Submenu label="Item 3">
						<ContextMenu.Item>Item 3.1</ContextMenu.Item>
						<ContextMenu.Item description="Description of item 3.2">
							Item 3.2
						</ContextMenu.Item>
					</ContextMenu.Submenu>

					<ContextMenu.Submenu
						label="Item 4"
						description="Description of item 4"
					>
						<ContextMenu.Group label="Group">
							<ContextMenu.RadioGroup
								value={radioValue1()}
								onChange={setRadioValue1}
							>
								<ContextMenu.Radio value="4.1">Item 4.1</ContextMenu.Radio>
								<ContextMenu.Radio
									value="4.2"
									description="Description of item 4.2"
								>
									Item 4.2
								</ContextMenu.Radio>
							</ContextMenu.RadioGroup>
						</ContextMenu.Group>

						<Divider />

						<ContextMenu.Checkbox checked={checked1()} onChange={setChecked1}>
							Item 4.3
						</ContextMenu.Checkbox>
						<ContextMenu.Checkbox
							checked={checked2()}
							onChange={setChecked2}
							description="Description of item 4.4"
						>
							Item 4.4
						</ContextMenu.Checkbox>
					</ContextMenu.Submenu>

					<Divider />

					<ContextMenu.Group label="Group">
						<ContextMenu.Item>Item 5</ContextMenu.Item>
						<ContextMenu.Item disabled>Item 6</ContextMenu.Item>
					</ContextMenu.Group>

					<Divider />

					<ContextMenu.RadioGroup
						value={radioValue2()}
						onChange={setRadioValue2}
					>
						<ContextMenu.Radio value="7">Item 7</ContextMenu.Radio>
						<ContextMenu.Radio value="8" description="Description of item 8">
							Item 8
						</ContextMenu.Radio>
					</ContextMenu.RadioGroup>

					<Divider />

					<ContextMenu.Checkbox checked={checked3()} onChange={setChecked3}>
						Item 9
					</ContextMenu.Checkbox>
					<ContextMenu.Checkbox
						checked={checked4()}
						onChange={setChecked4}
						description="Description of item 10"
					>
						Item 10
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
