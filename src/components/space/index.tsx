import "./index.scss";
import { JSX } from "solid-js/types/jsx";
import { JSXElement, splitProps } from "solid-js";

export type SpaceProps = JSX.IntrinsicElements["div"] & {
	children: JSXElement;
	size?: "small" | "medium" | "large";
	vertical?: boolean;
	wrap?: boolean;
	align?: "start" | "center" | "end";
};

export default function Space(props: SpaceProps) {
	const [{ size = "small", vertical = false, wrap = false, align }, others] =
		splitProps(props, ["size", "vertical", "wrap", "align"]);

	return (
		<div
			class="jdd space"
			classList={{
				vertical: vertical,
				medium: size === "medium",
				large: size === "large",
				wrap: wrap,
				start: align === "start",
				end: align === "end",
			}}
			{...others}
		/>
	);
}
