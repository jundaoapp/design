import { Menu } from "../menu";
import { MenuGroupProps } from "../menu/group";

export type DropdownGroupProps = Omit<MenuGroupProps, "type">;

export function DropdownGroup(props: DropdownGroupProps) {
	return <Menu.Group type="dropdown" {...props} />;
}
