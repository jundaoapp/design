import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { DropdownMenu } from "@kobalte/core";
import { MenuRadioGroupOptions } from "@kobalte/core/dist/types/menu";

export type DropdownRadioGroupProps = IntrinsicComponentProps<
	"div",
	{
		disabled?: boolean;
		onChange?: (value: string) => void;
	} & Omit<MenuRadioGroupOptions, "isDisabled" | "onValueChange">
>;

export function DropdownRadioGroup(props: DropdownRadioGroupProps) {
	const [local, others] = processProps({
		props,
		keys: ["disabled", "onChange"],
	});

	return (
		<DropdownMenu.RadioGroup
			isDisabled={local.disabled}
			onValueChange={local.onChange}
			{...others}
		/>
	);
}
