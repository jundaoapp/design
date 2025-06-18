import { Menu } from "../menu";
import type { MenuRadioProps } from "../menu/radio";

export type DropdownMenuRadioProps = Omit<MenuRadioProps, "type">;

export function DropdownMenuRadio(props: DropdownMenuRadioProps) {
	return <Menu.Radio type="dropdown" {...props} />;
}
