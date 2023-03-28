import "./index.scss";
import { JSXElement, Show } from "solid-js";
import { Text } from "..";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Separator, As } from "@kobalte/core";
import { combineProps } from "@solid-primitives/props";

export type DividerProps = IntrinsicComponentProps<
	"div",
	{
		children?: JSXElement;
		vertical?: boolean;
		dashed?: boolean;
		textPosition?: "left" | "center" | "right";
	}
>;

export function Divider(props: DividerProps) {
	const [local, others] = processProps({
		props,
		default: {
			vertical: false,
			dashed: false,
			textPosition: "center",
		},
		keys: ["children", "vertical", "dashed", "textPosition"],
	});

	const combinedProps = combineProps(others, {
		class: "jdd divider",
		get classList() {
			return {
				dashed: local.dashed,
				"with-text": !!local.children,
				"text-left": local.textPosition === "left",
				"text-right": local.textPosition === "right",
			};
		},
	});

	return (
		<Separator.Root
			asChild
			orientation={local.vertical ? "vertical" : "horizontal"}
		>
			<As
				component={local.children === undefined ? "hr" : "div"}
				{...combinedProps}
			>
				<Show when={local.children} keyed>
					{(children) => <Text>{children}</Text>}
				</Show>
			</As>
		</Separator.Root>
	);
}
