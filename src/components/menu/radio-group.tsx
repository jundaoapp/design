import { ContextMenu, DropdownMenu } from "@kobalte/core";
import { Dynamic } from "solid-js/web";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";

export type MenuRadioGroupProps = IntrinsicComponentProps<
	"div",
	{
		type: "contextmenu" | "dropdown";
		disabled?: boolean;
		onChange?: (value: string) => void;
	} & DropdownMenu.DropdownMenuRadioGroupProps
>;

export function MenuRadioGroup(props: MenuRadioGroupProps) {
	const [local, others] = processProps({
		props,
		keys: ["type"],
	});

	return (
		<Dynamic
			component={
				{
					contextmenu: ContextMenu.RadioGroup,
					dropdown: DropdownMenu.RadioGroup,
				}[local.type]
			}
			{...others}
		/>
	);
}
