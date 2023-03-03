import "./item.scss";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { DropdownMenu } from "@kobalte/core";
import { MenuCheckboxItemOptions } from "@kobalte/core/dist/types/menu";
import { createMemo, JSXElement, Show } from "solid-js";
import { Icon, Text } from "..";

export type DropdownCheckboxProps = IntrinsicComponentProps<
	"div",
	{
		disabled?: boolean;
		checked?: boolean;
		description?: JSXElement;
		onChange?: (checked: boolean) => void;
	} & Omit<
		MenuCheckboxItemOptions,
		"isDisabled" | "isChecked" | "isIndeterminate" | "onCheckedChange"
	>
>;

export function DropdownCheckbox(props: DropdownCheckboxProps) {
	const [local, others] = processProps({
		props,
		keys: ["disabled", "checked", "children", "description", "onChange"],
	});

	const children = createMemo(() => local.children);
	const description = createMemo(() => local.description);

	return (
		<DropdownMenu.CheckboxItem
			class="item checkbox"
			isDisabled={local.disabled}
			isChecked={local.checked}
			onCheckedChange={local.onChange}
			{...others}
		>
			<DropdownMenu.ItemIndicator class="indicator">
				<Text>
					<Icon icon="check" />
				</Text>
			</DropdownMenu.ItemIndicator>

			<DropdownMenu.ItemLabel class="label">
				<Show when={typeof children() === "string"} fallback={children()}>
					<Text>{children()}</Text>
				</Show>
			</DropdownMenu.ItemLabel>
			<DropdownMenu.ItemDescription class="description">
				<Show when={typeof description() === "string"} fallback={description()}>
					<Text type="secondary">{description()}</Text>
				</Show>
			</DropdownMenu.ItemDescription>
		</DropdownMenu.CheckboxItem>
	);
}
