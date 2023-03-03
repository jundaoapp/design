import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { ContextMenu, DropdownMenu } from "@kobalte/core";
import { MenuItemOptions } from "@kobalte/core/dist/types/menu";
import { createMemo, JSXElement, Show } from "solid-js";
import { Text } from "..";
import { Dynamic } from "solid-js/web";

export type MenuItemProps = IntrinsicComponentProps<
	"div",
	{
		type: "contextmenu" | "dropdown";
		disabled?: boolean;
		description?: JSXElement;
	} & Omit<MenuItemOptions, "isDisabled">
>;

export function MenuItem(props: MenuItemProps) {
	const [local, others] = processProps({
		props,
		keys: ["disabled", "children", "description", "type"],
	});

	const children = createMemo(() => local.children);
	const description = createMemo(() => local.description);

	return (
		<Dynamic
			component={
				{
					contextmenu: ContextMenu.Item,
					dropdown: DropdownMenu.Item,
				}[local.type]
			}
			isDisabled={local.disabled}
			class="item"
			{...others}
		>
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
