import { Menu } from "../menu";
import type { MenuRadioProps } from "../menu/radio";

export type ContextMenuRadioProps = Omit<MenuRadioProps, "type">;

export function ContextMenuRadio(props: ContextMenuRadioProps) {
	return <Menu.Radio type="contextmenu" {...props} />;
}
