import { Menu } from "../menu";
import { MenuSubmenuProps } from "../menu/submenu";

export type DropdownSubmenuProps = Omit<MenuSubmenuProps, "type">;

export function DropdownSubmenu(props: DropdownSubmenuProps) {
	return <Menu.Submenu type="dropdown" {...props} />;
}
