import "./index.scss";
import { ComponentProps, mergeProps, splitProps } from "solid-js";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";

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

	return (
		<svg
			class="jdd spinner"
			classList={{
				small: local.size === "small",
				large: local.size === "large",
			}}
			{...others}
		>
			<title>{local.label}</title>
			<circle />
		</svg>
	);
}
