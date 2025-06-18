import { Menu } from "../menu";
import type { MenuGroupProps } from "../menu/group";

export type DropdownMenuGroupProps = Omit<MenuGroupProps, "type">;

export function DropdownMenuGroup(props: DropdownMenuGroupProps) {
	return <Menu.Group type="dropdown" {...props} />;
}
