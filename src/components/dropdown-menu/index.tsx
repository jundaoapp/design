import { As, DropdownMenu as KobalteDropdownMenu } from "@kobalte/core";
import { RiArrowsArrowDownSLine } from "solid-icons/ri";
import { JSXElement, Show } from "solid-js";
import { Button } from "..";
import { Menu, MenuProps } from "../menu";
import { processProps } from "../utilities";
import { DropdownMenuCheckbox } from "./checkbox";
import { DropdownMenuGroup } from "./group";
import "./index.scss";
import { DropdownMenuItem } from "./item";
import { DropdownMenuRadio } from "./radio";
import { DropdownMenuRadioGroup } from "./radio-group";
import { DropdownMenuSubmenu } from "./submenu";

export type DropdownMenuProps = {
	label?: string;
	customTrigger?: JSXElement;
	type?: "primary" | "default";
	size?: "small" | "default" | "large";
	disabled?: boolean;
	danger?: boolean;
} & Omit<MenuProps, "type" | "trigger">;

function DropdownMenu(props: DropdownMenuProps) {
	const [local, others] = processProps({
		props,
		keys: ["label", "customTrigger", "type", "size", "disabled", "danger"],
	});

	return (
		<Menu
			type="dropdown"
			trigger={
				<Show
					when={local.customTrigger}
					keyed
					fallback={
						<KobalteDropdownMenu.Trigger asChild disabled={local.disabled}>
							<As
								component={Button}
								class="dropdown-menu-trigger"
								type={local.type}
								size={local.size}
								disabled={local.disabled}
								danger={local.danger}
							>
								{local.label}
								<RiArrowsArrowDownSLine class="dropdown-menu-trigger-icon" />
							</As>
						</KobalteDropdownMenu.Trigger>
					}
				>
					{(customTrigger) => (
						<KobalteDropdownMenu.Trigger asChild disabled={local.disabled}>
							<As component="div" class="jdd dropdown-menu-trigger">
								{customTrigger}
							</As>
						</KobalteDropdownMenu.Trigger>
					)}
				</Show>
			}
			{...others}
		/>
	);
}

const CompoundedDropdownMenu = DropdownMenu as typeof DropdownMenu & {
	Checkbox: typeof DropdownMenuCheckbox;
	Group: typeof DropdownMenuGroup;
	Item: typeof DropdownMenuItem;
	Radio: typeof DropdownMenuRadio;
	RadioGroup: typeof DropdownMenuRadioGroup;
	Submenu: typeof DropdownMenuSubmenu;
};
CompoundedDropdownMenu.Checkbox = DropdownMenuCheckbox;
CompoundedDropdownMenu.Group = DropdownMenuGroup;
CompoundedDropdownMenu.Item = DropdownMenuItem;
CompoundedDropdownMenu.Radio = DropdownMenuRadio;
CompoundedDropdownMenu.RadioGroup = DropdownMenuRadioGroup;
CompoundedDropdownMenu.Submenu = DropdownMenuSubmenu;
export { CompoundedDropdownMenu as DropdownMenu };
