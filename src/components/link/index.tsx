import "./index.scss";
import { JSX } from "solid-js/types/jsx";
import { JSXElement, splitProps } from "solid-js";

export type LinkProps = JSX.IntrinsicElements["a"] & {
	children: JSXElement;
	disabled?: boolean;
	type?: "default" | "secondary" | "success" | "warning" | "danger";
};

export default function Link(props: LinkProps) {
	const [{ href, disabled, type }, others] = splitProps(props, [
		"href",
		"disabled",
		"type",
	]);

	let hrefProp: { href?: string } = {};

	if (disabled !== true) {
		hrefProp.href = href;
	}

	return (
		<a
			class="jdd link"
			classList={{
				secondary: type === "secondary",
				success: type === "success",
				warning: type === "warning",
				danger: type === "danger",
			}}
			{...hrefProp}
			{...others}
		/>
	);
}
