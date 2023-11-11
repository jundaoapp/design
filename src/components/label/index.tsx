import { combineProps } from "@solid-primitives/props";
import { createMemo } from "solid-js";
import { Text } from "..";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";

export type LabelProps = IntrinsicComponentProps<
	"label",
	{
		for: HTMLInputElement;
		position?: "before" | "after";
	}
>;

export function Label(props: LabelProps) {
	const [local, others] = processProps({
		props,
		keys: ["for", "children", "position"],
	});

	const input = createMemo(() => local.for);

	const combinedProps = combineProps(others, {
		class: "jdd label",
	});

	return (
		<label
			dir={local.position === "before" ? "ltr" : "rtl"}
			for={input().id || undefined}
			{...combinedProps}
		>
			{input()}
			<Text>{local.children}</Text>
		</label>
	);
}
