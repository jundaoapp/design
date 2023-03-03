import { processProps } from "../utilities";
import { ContextMenu as KobalteContextMenu } from "@kobalte/core";
import { ContextMenuItem } from "./item";
import { ContextMenuGroup } from "./group";
import { ContextMenuCheckbox } from "./checkbox";
import { ContextMenuRadio } from "./radio";
import { ContextMenuRadioGroup } from "./radio-group";
import { ContextMenuSubmenu } from "./submenu";
import { createSignal, JSXElement } from "solid-js";
import { Menu, MenuProps } from "../menu";

export type ContextMenuProps = {
	children: JSXElement;
	menu: JSXElement;
} & Omit<MenuProps, "type" | "trigger" | "children">;

function ContextMenu(props: ContextMenuProps) {
	const [local, others] = processProps({
		props,
		keys: ["children", "menu"],
	});

	return (
		<Menu
			type="contextmenu"
			trigger={
				<KobalteContextMenu.Trigger>
					{local.children}
				</KobalteContextMenu.Trigger>
			}
			modal={true}
			{...others}
		>
			{local.menu}
		</Menu>
	);
}

const CompoundedContextMenu = ContextMenu as typeof ContextMenu & {
	Checkbox: typeof ContextMenuCheckbox;
	Group: typeof ContextMenuGroup;
	Item: typeof ContextMenuItem;
	Radio: typeof ContextMenuRadio;
	RadioGroup: typeof ContextMenuRadioGroup;
	Submenu: typeof ContextMenuSubmenu;
};
CompoundedContextMenu.Checkbox = ContextMenuCheckbox;
CompoundedContextMenu.Group = ContextMenuGroup;
CompoundedContextMenu.Item = ContextMenuItem;
CompoundedContextMenu.Radio = ContextMenuRadio;
CompoundedContextMenu.RadioGroup = ContextMenuRadioGroup;
CompoundedContextMenu.Submenu = ContextMenuSubmenu;
export { CompoundedContextMenu as ContextMenu };
