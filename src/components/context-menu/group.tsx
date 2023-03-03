import { Menu } from "../menu";
import { MenuGroupProps } from "../menu/group";

export type ContextMenuGroupProps = Omit<MenuGroupProps, "type">;

export function ContextMenuGroup(props: ContextMenuGroupProps) {
	return <Menu.Group type="contextmenu" {...props} />;
}
