import { Menu } from "../menu";
import type { MenuCheckboxProps } from "../menu/checkbox";

export type DropdownMenuCheckboxProps = Omit<MenuCheckboxProps, "type">;

export function DropdownMenuCheckbox(props: DropdownMenuCheckboxProps) {
	return <Menu.Checkbox type="dropdown" {...props} />;
}
