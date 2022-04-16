import "./index.scss";
import { HTMLAttributes } from "solid-js/types/jsx";
import { JSXElement, splitProps } from "solid-js";
import { TextProps } from "@jundao/design/text";

export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
	children: JSXElement,
	size?: "small" | "medium" | "large",
	vertical?: boolean,
	wrap?: boolean,
	align?: "left" | "center" | "right",
}

export default function Space(props: TextProps) {
	const [{ size = "small", vertical, wrap, align }, others] = splitProps(
		props,
		["size", "vertical", "wrap", "align"],
	);

	return (
		<div class="jdd jdd-space"
              classList={{
				  vertical: vertical === true,
				  medium: size === "medium",
				  large: size === "large",
				  wrap: wrap === true,
				  left: align === "left",
				  right: align === "right",
        }}
              {...others}/>
	);
}
