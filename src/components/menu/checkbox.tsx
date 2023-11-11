import { As, ContextMenu, DropdownMenu } from "@kobalte/core";
import { combineProps } from "@solid-primitives/props";
import { RiSystemCheckFill } from "solid-icons/ri";
import { JSXElement, Show, createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Text } from "..";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";

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
		keys: ["children", "description", "type", "shortcut"],
	});

	const children = createMemo(() => local.children);
	const description = createMemo(() => local.description);

	const combinedProps = combineProps(others, {
		class: "item checkbox",
	});

	return (
		<Dynamic
			component={
				{
					contextmenu: ContextMenu.CheckboxItem,
					dropdown: DropdownMenu.CheckboxItem,
				}[local.type]
			}
			{...combinedProps}
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
					<RiSystemCheckFill />
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
						<Text class="shortcut" keyboard>
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
