import { Menu } from "../menu";
import { MenuRadioProps } from "../menu/radio";

export type DropdownMenuRadioProps = Omit<MenuRadioProps, "type">;

export function DropdownMenuRadio(props: DropdownMenuRadioProps) {
	return <Menu.Radio type="dropdown" {...props} />;
}
