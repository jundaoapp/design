import { Menu } from "../menu";
import { MenuItemProps } from "../menu/item";

export type DropdownMenuItemProps = Omit<MenuItemProps, "type">;

export function DropdownMenuItem(props: DropdownMenuItemProps) {
	return <Menu.Item type="dropdown" {...props} />;
}
