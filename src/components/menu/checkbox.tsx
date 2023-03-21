import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { DropdownMenu, ContextMenu, As } from "@kobalte/core";
import { createMemo, JSXElement, Show } from "solid-js";
import { Icon, Text } from "..";
import { Dynamic } from "solid-js/web";

export type MenuCheckboxProps = IntrinsicComponentProps<
	"div",
	{
		type: "contextmenu" | "dropdown";
		disabled?: boolean;
		checked?: boolean;
		description?: JSXElement;
		onChange?: (checked: boolean) => void;
		shortcut?: string;
	} & Omit<
		DropdownMenu.DropdownMenuCheckboxItemProps,
		"isDisabled" | "isChecked" | "isIndeterminate" | "onCheckedChange"
	>
>;

export function MenuCheckbox(props: MenuCheckboxProps) {
	const [local, others] = processProps({
		props,
		keys: [
			"disabled",
			"checked",
			"children",
			"description",
			"onChange",
			"type",
			"shortcut",
		],
	});

	const children = createMemo(() => local.children);
	const description = createMemo(() => local.description);

	return (
		<Dynamic
			component={
				{
					contextmenu: ContextMenu.CheckboxItem,
					dropdown: DropdownMenu.CheckboxItem,
				}[local.type]
			}
			class="item checkbox"
			isDisabled={local.disabled}
			isChecked={local.checked}
			onCheckedChange={local.onChange}
			{...others}
		>
			<Dynamic
				component={
					{
						contextmenu: ContextMenu.ItemIndicator,
						dropdown: DropdownMenu.ItemIndicator,
					}[local.type]
				}
				asChild
			>
				<As component={Text} class="indicator">
					<Icon icon="check" />
				</As>
			</Dynamic>

			<Dynamic
				component={
					{
						contextmenu: ContextMenu.ItemLabel,
						dropdown: DropdownMenu.ItemLabel,
					}[local.type]
				}
				class="label"
			>
				<Show when={typeof children() === "string"} fallback={children()}>
					<Text>{children()}</Text>
				</Show>

				<Show when={local.shortcut} keyed>
					{(shortcut) => (
						<Text class="shortcut" font="mono" type="secondary">
							{shortcut}
						</Text>
					)}
				</Show>
			</Dynamic>
			<Dynamic
				component={
					{
						contextmenu: ContextMenu.ItemDescription,
						dropdown: DropdownMenu.ItemDescription,
					}[local.type]
				}
				class="description"
			>
				<Show when={typeof description() === "string"} fallback={description()}>
					<Text type="secondary">{description()}</Text>
				</Show>
			</Dynamic>
		</Dynamic>
	);
}
