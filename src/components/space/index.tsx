import "./index.scss";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { combineProps } from "@solid-primitives/props";

export type SpaceProps = IntrinsicComponentProps<
	"div",
	{
		size?: "small" | "medium" | "large";
		vertical?: boolean;
		wrap?: boolean;
		align?: "start" | "center" | "end";
	}
>;

export function Space(props: SpaceProps) {
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

	const combinedProps = combineProps(others, {
		class: "jdd space",
		get classList() {
			return {
				vertical: local.vertical,
				medium: local.size === "medium",
				large: local.size === "large",
				wrap: local.wrap,
				start: local.align === "start",
				end: local.align === "end",
			};
		},
	});

	return <div {...combinedProps} />;
}
