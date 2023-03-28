import "./index.scss";
import { ComponentProps, mergeProps, splitProps } from "solid-js";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { combineProps } from "@solid-primitives/props";

export type SpinnerProps = IntrinsicComponentProps<
	"svg",
	{
		size?: "small" | "default" | "large";
		label?: string;
	}
>;

export function Spinner(props: SpinnerProps) {
	const [local, others] = processProps({
		props,
		default: {
			size: "default",
			label: "Loading",
		},
		keys: ["size", "label"],
	});

	const combinedProps = combineProps(others, {
		class: "jdd spinner",
		get classList() {
			return {
				small: local.size === "small",
				large: local.size === "large",
			};
		},
	});

	return (
		<svg {...combinedProps}>
			<title>{local.label}</title>
			<circle />
		</svg>
	);
}
