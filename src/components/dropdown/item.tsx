import { MenuItemProps } from "../menu/item";
import { Menu } from "../menu";

export type DropdownItemProps = Omit<MenuItemProps, "type">;

export function DropdownItem(props: DropdownItemProps) {
	return <Menu.Item type="dropdown" {...props} />;
}
