import "./index.scss";
import { JSX } from "solid-js/types/jsx";
import { splitProps } from "solid-js";

export type SpinnerProps = Omit<JSX.IntrinsicElements["svg"], "children"> & {
	size?: "small" | "default" | "large" | "full";
	label?: string;
};

export default function Spinner(props: SpinnerProps) {
	const [{ size = "default", label = "loading" }, others] = splitProps(props, [
		"size",
		"label",
	]);

	return (
		<svg
			class="jdd spinner"
			classList={{
				small: size === "small",
				large: size === "large",
				full: size === "full",
			}}
			{...others}
		>
			<title>{label}</title>
			<circle class="fixed" />
			<circle class="spin" />
		</svg>
	);
}
