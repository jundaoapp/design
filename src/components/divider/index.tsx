import "./index.scss";
import { ComponentProps, JSXElement, mergeProps, splitProps } from "solid-js";
import { Text } from "@jundao/design";

export type DividerProps = ComponentProps<"div"> & {
	children?: JSXElement;
	vertical?: boolean;
	dashed?: boolean;
	orientation?: "left" | "right";
};

const defaultProps = {
	vertical: false,
	dashed: false,
};

export default function Divider(props: DividerProps) {
	const [local, others] = splitProps(mergeProps(defaultProps, props), [
		"children",
		"vertical",
		"dashed",
		"orientation",
	]);

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
			{...others}
		/>
	);
}
