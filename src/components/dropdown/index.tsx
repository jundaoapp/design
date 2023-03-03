import "./index.scss";
import { processProps } from "../utilities";
import { DropdownMenu } from "@kobalte/core";
import { Button, Icon } from "..";
import { DropdownItem } from "./item";
import { DropdownGroup } from "./group";
import { DropdownCheckbox } from "./checkbox";
import { DropdownRadio } from "./radio";
import { DropdownRadioGroup } from "./radio-group";
import { DropdownSubmenu } from "./submenu";
import { JSXElement, Show } from "solid-js";
import { Menu, MenuProps } from "../menu";

export type DropdownProps = {
	label?: string;
	customTrigger?: JSXElement;
	type?: "primary" | "default";
	size?: "small" | "default" | "large";
	disabled?: boolean;
	danger?: boolean;
} & Omit<MenuProps, "type" | "trigger">;

function Dropdown(props: DropdownProps) {
	const [local, others] = processProps({
		props,
		keys: ["label", "customTrigger", "type", "size", "disabled", "danger"],
	});

	return (
		<Menu
			type="dropdown"
			trigger={
				<DropdownMenu.Trigger
					as="div"
					class="jdd dropdown-trigger"
					isDisabled={local.disabled}
				>
					<Show
						when={local.customTrigger}
						keyed
						fallback={
							<Button
								type={local.type}
								size={local.size}
								disabled={local.disabled}
								danger={local.danger}
							>
								{local.label}{" "}
								<DropdownMenu.Icon class="dropdown-trigger-icon">
									<Icon icon="arrow-down-s" line />
								</DropdownMenu.Icon>
							</Button>
						}
					>
						{(customTrigger) => customTrigger}
					</Show>
				</DropdownMenu.Trigger>
			}
			{...others}
		/>
	);
}

const CompoundedDropdown = Dropdown as typeof Dropdown & {
	Checkbox: typeof DropdownCheckbox;
	Group: typeof DropdownGroup;
	Item: typeof DropdownItem;
	Radio: typeof DropdownRadio;
	RadioGroup: typeof DropdownRadioGroup;
	Submenu: typeof DropdownSubmenu;
};
CompoundedDropdown.Checkbox = DropdownCheckbox;
CompoundedDropdown.Group = DropdownGroup;
CompoundedDropdown.Item = DropdownItem;
CompoundedDropdown.Radio = DropdownRadio;
CompoundedDropdown.RadioGroup = DropdownRadioGroup;
CompoundedDropdown.Submenu = DropdownSubmenu;
export { CompoundedDropdown as Dropdown };
