import "./item.scss";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { DropdownMenu } from "@kobalte/core";
import { MenuItemOptions } from "@kobalte/core/dist/types/menu";
import { createMemo, JSXElement, Show } from "solid-js";
import { Text } from "..";

export type DropdownItemProps = IntrinsicComponentProps<
	"div",
	{
		disabled?: boolean;
		description?: JSXElement;
	} & Omit<MenuItemOptions, "isDisabled">
>;

export function DropdownItem(props: DropdownItemProps) {
	const [local, others] = processProps({
		props,
		keys: ["disabled", "children", "description"],
	});

	const children = createMemo(() => local.children);
	const description = createMemo(() => local.description);

	return (
		<DropdownMenu.Item isDisabled={local.disabled} class="item" {...others}>
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
		</DropdownMenu.Item>
	);
}
