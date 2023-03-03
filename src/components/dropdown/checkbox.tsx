import { Menu } from "../menu";
import { MenuCheckboxProps } from "../menu/checkbox";

export type DropdownCheckboxProps = Omit<MenuCheckboxProps, "type">;

export function DropdownCheckbox(props: DropdownCheckboxProps) {
	return <Menu.Checkbox type="dropdown" {...props} />;
}
