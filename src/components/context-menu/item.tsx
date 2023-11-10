import { Menu } from "../menu";
import { MenuItemProps } from "../menu/item";

export type ContextMenuItemProps = Omit<MenuItemProps, "type">;

export function ContextMenuItem(props: ContextMenuItemProps) {
	return <Menu.Item type="contextmenu" {...props} />;
}
