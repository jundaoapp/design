import { Menu } from "../menu";
import { MenuSubmenuProps } from "../menu/submenu";

export type DropdownMenuSubmenuProps = Omit<MenuSubmenuProps, "type">;

export function DropdownMenuSubmenu(props: DropdownMenuSubmenuProps) {
	return <Menu.Submenu type="dropdown" {...props} />;
}
