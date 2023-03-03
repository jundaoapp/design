import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { JSXElement, createMemo, Show } from "solid-js";
import { ContextMenu, DropdownMenu } from "@kobalte/core";
import { MenuSubContentOptions } from "@kobalte/core/dist/types/menu";
import { Card, Icon, Text } from "..";
import { Dynamic } from "solid-js/web";

export type MenuSubmenuProps = IntrinsicComponentProps<
	"div",
	{
		type: "contextmenu" | "dropdown";
		label?: JSXElement;
		description?: JSXElement;
		disabled?: boolean;
	} & MenuSubContentOptions
>;

export function MenuSubmenu(props: MenuSubmenuProps) {
	const [local, others] = processProps({
		props,
		keys: ["disabled", "children", "description", "label", "type"],
	});

	const label = createMemo(() => local.label);
	const description = createMemo(() => local.description);

	return (
		<Dynamic
			component={
				{
					contextmenu: ContextMenu.Sub,
					dropdown: DropdownMenu.Sub,
				}[local.type]
			}
			overlap
		>
			<Dynamic
				component={
					{
						contextmenu: ContextMenu.SubTrigger,
						dropdown: DropdownMenu.SubTrigger,
					}[local.type]
				}
				isDisabled={local.disabled}
				class="item submenu"
			>
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
			</Dynamic>

			<Dynamic
				component={
					{
						contextmenu: ContextMenu.Portal,
						dropdown: DropdownMenu.Portal,
					}[local.type]
				}
			>
				<Dynamic
					component={
						{
							contextmenu: ContextMenu.SubContent,
							dropdown: DropdownMenu.SubContent,
						}[local.type]
					}
					class="jdd menu"
					{...others}
				>
					<Card contrastBackground noPadding size="small">
						{local.children}
					</Card>
				</Dynamic>
			</Dynamic>
		</Dynamic>
	);
}
