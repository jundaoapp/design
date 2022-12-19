import "./index.scss";
import { ComponentProps, mergeProps, splitProps } from "solid-js";

export type SpinnerProps = Omit<ComponentProps<"svg">, "children"> & {
	size?: "small" | "default" | "large";
	label?: string;
};

const defaultProps = {
	size: "default",
	label: "Loading",
};

export default function Spinner(props: SpinnerProps) {
	const [local, others] = splitProps(mergeProps(defaultProps, props), [
		"size",
		"label",
	]);

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
