import "./item.scss";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { DropdownMenu } from "@kobalte/core";
import { MenuRadioItemOptions } from "@kobalte/core/dist/types/menu";
import { createMemo, JSXElement, Show } from "solid-js";
import { Icon, Text } from "..";

export type DropdownRadioProps = IntrinsicComponentProps<
	"div",
	{
		disabled?: boolean;
		description?: JSXElement;
	} & Omit<MenuRadioItemOptions, "isDisabled">
>;

export function DropdownRadio(props: DropdownRadioProps) {
	const [local, others] = processProps({
		props,
		keys: ["disabled", "children", "description"],
	});

	const children = createMemo(() => local.children);
	const description = createMemo(() => local.description);

	return (
		<DropdownMenu.RadioItem
			class="item radio"
			isDisabled={local.disabled}
			{...others}
		>
			<DropdownMenu.ItemIndicator class="indicator">
				<Text>
					<Icon icon="checkbox-blank-circle" />
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
		</DropdownMenu.RadioItem>
	);
}
