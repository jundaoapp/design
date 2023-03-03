import { MenuRadioGroupProps } from "../menu/radio-group";
import { Menu } from "../menu";

export type ContextMenuRadioGroupProps = Omit<MenuRadioGroupProps, "type">;

export function ContextMenuRadioGroup(props: ContextMenuRadioGroupProps) {
	return <Menu.RadioGroup type="contextmenu" {...props} />;
}
