import { Menu } from "../menu";
import { MenuCheckboxProps } from "../menu/checkbox";

export type ContextMenuCheckboxProps = Omit<MenuCheckboxProps, "type">;

export function ContextMenuCheckbox(props: ContextMenuCheckboxProps) {
	return <Menu.Checkbox type="contextmenu" {...props} />;
}
