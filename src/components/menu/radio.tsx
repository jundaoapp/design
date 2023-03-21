import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { ContextMenu, DropdownMenu } from "@kobalte/core";
import { createMemo, JSXElement, Show } from "solid-js";
import { Icon, Text } from "..";
import { Dynamic } from "solid-js/web";

export type MenuRadioProps = IntrinsicComponentProps<
	"div",
	{
		type: "contextmenu" | "dropdown";
		disabled?: boolean;
		description?: JSXElement;
		shortcut?: string;
	} & Omit<DropdownMenu.DropdownMenuRadioItemProps, "isDisabled">
>;

export function MenuRadio(props: MenuRadioProps) {
	const [local, others] = processProps({
		props,
		keys: ["disabled", "children", "description", "type", "shortcut"],
	});

	const children = createMemo(() => local.children);
	const description = createMemo(() => local.description);

	return (
		<Dynamic
			component={
				{
					contextmenu: ContextMenu.RadioItem,
					dropdown: DropdownMenu.RadioItem,
				}[local.type]
			}
			class="item radio"
			isDisabled={local.disabled}
			{...others}
		>
			<Dynamic
				component={
					{
						contextmenu: ContextMenu.ItemIndicator,
						dropdown: DropdownMenu.ItemIndicator,
					}[local.type]
				}
				class="indicator"
			>
				<Text>
					<Icon icon="checkbox-blank-circle" />
				</Text>
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
