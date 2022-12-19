import "./index.scss";
import { ComponentProps, JSXElement, mergeProps, splitProps } from "solid-js";

export type SpaceProps = RequiredChildren<ComponentProps<"div">> & {
	size?: "small" | "medium" | "large";
	vertical?: boolean;
	wrap?: boolean;
	align?: "start" | "center" | "end";
};

const defaultProps = {
	size: "small",
	vertical: false,
	wrap: false,
};

export default function Space(props: SpaceProps) {
	const [local, others] = splitProps(mergeProps(defaultProps, props), [
		"size",
		"vertical",
		"wrap",
		"align",
	]);

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
