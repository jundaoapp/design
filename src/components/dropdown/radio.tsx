import { Menu } from "../menu";
import { MenuRadioProps } from "../menu/radio";

export type DropdownRadioProps = Omit<MenuRadioProps, "type">;

export function DropdownRadio(props: DropdownRadioProps) {
	return <Menu.Radio type="dropdown" {...props} />;
}
