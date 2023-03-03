import { MenuRadioGroupProps } from "../menu/radio-group";
import { Menu } from "../menu";

export type DropdownRadioGroupProps = Omit<MenuRadioGroupProps, "type">;

export function DropdownRadioGroup(props: DropdownRadioGroupProps) {
	return <Menu.RadioGroup type="dropdown" {...props} />;
}
