import { Menu } from "../menu";
import { MenuCheckboxProps } from "../menu/checkbox";

export type DropdownMenuCheckboxProps = Omit<MenuCheckboxProps, "type">;

export function DropdownMenuCheckbox(props: DropdownMenuCheckboxProps) {
	return <Menu.Checkbox type="dropdown" {...props} />;
}
