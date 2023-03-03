import "./index.scss";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Placement } from "@kobalte/core/dist/types/popper/utils";
import { ContextMenu, DropdownMenu } from "@kobalte/core";
import { Card } from "..";
import { MenuContentOptions } from "@kobalte/core/dist/types/menu";
import { MenuItem } from "./item";
import { MenuGroup } from "./group";
import { MenuCheckbox } from "./checkbox";
import { MenuRadio } from "./radio";
import { MenuRadioGroup } from "./radio-group";
import { MenuSubmenu } from "./submenu";
import { JSXElement, Show } from "solid-js";
import { Dynamic } from "solid-js/web";

export type MenuProps = IntrinsicComponentProps<
	"div",
	{
		type: "contextmenu" | "dropdown";
		trigger: JSXElement;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		placement?: Placement;
		modal?: boolean;
	} & MenuContentOptions
>;

function Menu(props: MenuProps) {
	const [local, others] = processProps({
		props,
		default: {
			modal: false,
		},
		keys: [
			"type",
			"open",
			"onOpenChange",
			"placement",
			"children",
			"trigger",
			"modal",
		],
	});

	return (
		<Dynamic
			component={
				{
					contextmenu: ContextMenu.Root,
					dropdown: DropdownMenu.Root,
				}[local.type]
			}
			isModal={local.modal}
			isOpen={local.open}
			onOpenChange={local.onOpenChange}
			placement={local.placement}
		>
			{local.trigger}

			<Dynamic
				component={
					{
						contextmenu: ContextMenu.Portal,
						dropdown: DropdownMenu.Portal,
					}[local.type]
				}
			>
				<Dynamic
					component={
						{
							contextmenu: ContextMenu.Content,
							dropdown: DropdownMenu.Content,
						}[local.type]
					}
					class="jdd menu"
					{...others}
				>
					<Show when={local.type === "dropdown"}>
						<DropdownMenu.Arrow class="dropdown-arrow" />
					</Show>

					<Card contrastBackground noPadding size="small">
						{local.children}
					</Card>
				</Dynamic>
			</Dynamic>
		</Dynamic>
	);
}

const CompoundedMenu = Menu as typeof Menu & {
	Checkbox: typeof MenuCheckbox;
	Group: typeof MenuGroup;
	Item: typeof MenuItem;
	Radio: typeof MenuRadio;
	RadioGroup: typeof MenuRadioGroup;
	Submenu: typeof MenuSubmenu;
};
CompoundedMenu.Checkbox = MenuCheckbox;
CompoundedMenu.Group = MenuGroup;
CompoundedMenu.Item = MenuItem;
CompoundedMenu.Radio = MenuRadio;
CompoundedMenu.RadioGroup = MenuRadioGroup;
CompoundedMenu.Submenu = MenuSubmenu;
export { CompoundedMenu as Menu };
