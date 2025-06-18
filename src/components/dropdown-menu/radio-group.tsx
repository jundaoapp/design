import { Menu } from "../menu";
import type { MenuRadioGroupProps } from "../menu/radio-group";

export type DropdownMenuRadioGroupProps = Omit<MenuRadioGroupProps, "type">;

export function DropdownMenuRadioGroup(props: DropdownMenuRadioGroupProps) {
	return <Menu.RadioGroup type="dropdown" {...props} />;
}
