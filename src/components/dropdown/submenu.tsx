import "./item.scss";
import "./index.scss";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { JSXElement, createMemo, Show } from "solid-js";
import { DropdownMenu } from "@kobalte/core";
import { MenuSubContentOptions } from "@kobalte/core/dist/types/menu";
import { Card, Icon, Text } from "..";

export type DropdownSubmenuProps = IntrinsicComponentProps<
	"div",
	{
		label?: JSXElement;
		description?: JSXElement;
		disabled?: boolean;
	} & MenuSubContentOptions
>;

export function DropdownSubmenu(props: DropdownSubmenuProps) {
	const [local, others] = processProps({
		props,
		keys: ["disabled", "children", "description", "label"],
	});

	const label = createMemo(() => local.label);
	const description = createMemo(() => local.description);

	return (
		<DropdownMenu.Sub overlap>
			<DropdownMenu.SubTrigger isDisabled={local.disabled} class="item submenu">
				<div class="indicator">
					<Text>
						<Icon icon="arrow-right-s" line />
					</Text>
				</div>

				<div class="label">
					<Show when={typeof label() === "string"} fallback={label()}>
						<Text>{label()}</Text>
					</Show>
				</div>
				<div class="description">
					<Show
						when={typeof description() === "string"}
						fallback={description()}
					>
						<Text type="secondary">{description()}</Text>
					</Show>
				</div>
			</DropdownMenu.SubTrigger>

			<DropdownMenu.Portal>
				<DropdownMenu.SubContent class="jdd dropdown" {...others}>
					<Card contrastBackground noPadding size="small">
						{local.children}
					</Card>
				</DropdownMenu.SubContent>
			</DropdownMenu.Portal>
		</DropdownMenu.Sub>
	);
}
