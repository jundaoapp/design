import "./index.scss";
import {
	ComponentProps,
	JSXElement,
	mergeProps,
	Show,
	splitProps,
} from "solid-js";
import { Text } from "@jundao/design";
import { processProps } from "@jundao/design/utilities";
import { IntrinsicComponentProps } from "@jundao/design/types";
import { Separator } from "@kobalte/core";

export type DividerProps = IntrinsicComponentProps<
	"div",
	{
		children?: JSXElement;
		vertical?: boolean;
		dashed?: boolean;
		textPosition?: "left" | "center" | "right";
	}
>;

export default function Divider(props: DividerProps) {
	const [local, others] = processProps({
		props,
		default: {
			vertical: false,
			dashed: false,
			textPosition: "center",
		},
		keys: ["children", "vertical", "dashed", "textPosition"],
	});

	return (
		<Separator.Root
			as={local.children === undefined ? "hr" : "div"}
			class="jdd divider"
			classList={{
				dashed: local.dashed,
				"with-text": !!local.children,
				"text-left": local.textPosition === "left",
				"text-right": local.textPosition === "right",
			}}
			orientation={local.vertical ? "vertical" : "horizontal"}
			{...others}
		>
			<Show when={local.children}>
				<Text>{local.children}</Text>
			</Show>
		</Separator.Root>
	);
}
