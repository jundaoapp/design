import { MenuRadioGroupProps } from "../menu/radio-group";
import { Menu } from "../menu";

export type DropdownMenuRadioGroupProps = Omit<MenuRadioGroupProps, "type">;

export function DropdownMenuRadioGroup(props: DropdownMenuRadioGroupProps) {
	return <Menu.RadioGroup type="dropdown" {...props} />;
}
