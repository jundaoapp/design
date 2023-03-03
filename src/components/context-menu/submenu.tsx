import { Menu } from "../menu";
import { MenuSubmenuProps } from "../menu/submenu";

export type ContextMenuSubmenuProps = Omit<MenuSubmenuProps, "type">;

export function ContextMenuSubmenu(props: ContextMenuSubmenuProps) {
	return <Menu.Submenu type="contextmenu" {...props} />;
}
