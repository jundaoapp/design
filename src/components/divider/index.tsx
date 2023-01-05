import "./index.scss";
import { ComponentProps, JSXElement, mergeProps, splitProps } from "solid-js";
import { Text } from "@jundao/design";
import { processProps } from "@jundao/design/utilities";
import { IntrinsicComponentProps } from "@jundao/design/types";

export type DividerProps = IntrinsicComponentProps<
	"div",
	{
		children?: JSXElement;
		vertical?: boolean;
		dashed?: boolean;
		orientation?: "left" | "right";
	}
>;

export default function Divider(props: DividerProps) {
	const [local, others] = processProps({
		props,
		default: {
			vertical: false,
			dashed: false,
		},
		keys: ["children", "vertical", "dashed", "orientation"],
	});

	let child = <>{local.children}</>;

	if (local.children) {
		child = <Text>{child}</Text>;
	}

	return (
		<div
			class={`jdd divider ${local.orientation ?? ""}`}
			classList={{
				vertical: local.vertical,
				dashed: local.dashed,
				"with-text": !!local.children,
			}}
			role="separator"
			children={child}
			aria-orientation={local.vertical ? "vertical" : undefined}
			{...others}
		/>
	);
}
