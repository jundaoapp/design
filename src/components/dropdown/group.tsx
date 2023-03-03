import "./group.scss";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { DropdownMenu } from "@kobalte/core";
import { createMemo, JSXElement, Show } from "solid-js";
import { Text } from "..";

export type DropdownGroupProps = IntrinsicComponentProps<
	"div",
	{
		label?: JSXElement;
	}
>;

export function DropdownGroup(props: DropdownGroupProps) {
	const [local, others] = processProps({
		props,
		keys: ["label", "children"],
	});

	const label = createMemo(() => local.label);

	return (
		<DropdownMenu.Group class="group" {...others}>
			<DropdownMenu.GroupLabel as="div" class="label">
				<Show when={typeof label() === "string"} fallback={label()}>
					<Text type="secondary">{label()}</Text>
				</Show>
			</DropdownMenu.GroupLabel>

			{local.children}
		</DropdownMenu.Group>
	);
}
