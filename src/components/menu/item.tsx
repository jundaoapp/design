import { ContextMenu, DropdownMenu } from "@kobalte/core";
import { combineProps } from "@solid-primitives/props";
import { JSXElement, Show, createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Text } from "..";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";

export type MenuItemProps = IntrinsicComponentProps<
	"div",
	{
		type: "contextmenu" | "dropdown";
		disabled?: boolean;
		description?: JSXElement;
		icon?: JSXElement;
		shortcut?: string;
	} & Omit<DropdownMenu.DropdownMenuItemProps, "isDisabled">
>;

export function MenuItem(props: MenuItemProps) {
	const [local, others] = processProps({
		props,
		keys: ["children", "description", "type", "icon", "shortcut"],
	});

	const children = createMemo(() => local.children);
	const description = createMemo(() => local.description);

	const combinedProps = combineProps(others, {
		class: "item",
		get classList() {
			return {
				"with-icon": local.icon !== undefined,
				"no-icon": local.icon === undefined,
			};
		},
	});

	return (
		<Dynamic
			component={
				{
					contextmenu: ContextMenu.Item,
					dropdown: DropdownMenu.Item,
				}[local.type]
			}
			{...combinedProps}
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
				<Show when={local.icon} keyed>
					{(icon) => <Text>{icon}</Text>}
				</Show>
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
