import "./index.scss";
import { ComponentProps, JSXElement, mergeProps, splitProps } from "solid-js";
import { processProps } from "@jundao/design/utilities";
import { IntrinsicComponentProps } from "@jundao/design/types";

export type SpaceProps = IntrinsicComponentProps<
	"div",
	{
		size?: "small" | "medium" | "large";
		vertical?: boolean;
		wrap?: boolean;
		align?: "start" | "center" | "end";
	}
>;

export default function Space(props: SpaceProps) {
	const [local, others] = processProps({
		props,
		default: {
			size: "small",
			vertical: false,
			wrap: false,
			align: "start",
		},
		keys: ["size", "vertical", "wrap", "align"],
	});

	return (
		<div
			class="jdd space"
			classList={{
				vertical: local.vertical,
				medium: local.size === "medium",
				large: local.size === "large",
				wrap: local.wrap,
				start: local.align === "start",
				end: local.align === "end",
			}}
			{...others}
		/>
	);
}
