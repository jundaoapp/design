import { MenuItemProps } from "../menu/item";
import { Menu } from "../menu";

export type DropdownMenuItemProps = Omit<MenuItemProps, "type">;

export function DropdownMenuItem(props: DropdownMenuItemProps) {
	return <Menu.Item type="dropdown" {...props} />;
}
