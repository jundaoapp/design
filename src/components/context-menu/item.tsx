import { MenuItemProps } from "../menu/item";
import { Menu } from "../menu";

export type ContextMenuItemProps = Omit<MenuItemProps, "type">;

export function ContextMenuItem(props: ContextMenuItemProps) {
	return <Menu.Item type="contextmenu" {...props} />;
}
