import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { DropdownMenu, ContextMenu } from "@kobalte/core";
import { createMemo, JSXElement, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Text } from "..";

export type MenuGroupProps = IntrinsicComponentProps<
	"div",
	{
		type: "contextmenu" | "dropdown";
		label?: JSXElement;
	}
>;

export function MenuGroup(props: MenuGroupProps) {
	const [local, others] = processProps({
		props,
		keys: ["label", "children", "type"],
	});

	const label = createMemo(() => local.label);

	return (
		<Dynamic
			component={
				{
					contextmenu: ContextMenu.Group,
					dropdown: DropdownMenu.Group,
				}[local.type]
			}
			class="group"
			{...others}
		>
			<Dynamic
				component={
					{
						contextmenu: ContextMenu.GroupLabel,
						dropdown: DropdownMenu.GroupLabel,
					}[local.type]
				}
				as="div"
				class="label"
			>
				<Show when={typeof label() === "string"} fallback={label()}>
					<Text type="secondary">{label()}</Text>
				</Show>
			</Dynamic>

			{local.children}
		</Dynamic>
	);
}
