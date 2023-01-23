import "./index.scss";
import { splitProps, ComponentProps } from "solid-js";
import { Text } from "..";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";

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

	return (
		<label
			class="jdd label"
			dir={local.position === "before" ? "ltr" : "rtl"}
			for={local.for.id || undefined}
			{...others}
		>
			{local.for}
			<Text>{local.children}</Text>
		</label>
	);
}
