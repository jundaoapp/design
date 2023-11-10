import { Menu } from "../menu";
import { MenuRadioGroupProps } from "../menu/radio-group";

export type ContextMenuRadioGroupProps = Omit<MenuRadioGroupProps, "type">;

export function ContextMenuRadioGroup(props: ContextMenuRadioGroupProps) {
	return <Menu.RadioGroup type="contextmenu" {...props} />;
}
