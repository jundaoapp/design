import { JSXElement, Show, splitProps } from "solid-js";
import "./index.scss";
import { JSX } from "solid-js/types/jsx";
import { Spinner } from "@jundao/design";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
	children: JSXElement;
	type?: "primary" | "default" | "dashed";
	size?: "small" | "default" | "large";
	disabled?: boolean;
	danger?: boolean;
	loading?: boolean;
};

export default function Button(props: ButtonProps) {
	const [
		{ children, type, size, disabled = false, danger = false, loading = false },
		others,
	] = splitProps(props, [
		"children",
		"type",
		"size",
		"disabled",
		"danger",
		"loading",
	]);

	const child = children ? <span>{children}</span> : null;

	return (
		<button
			class="jdd button"
			disabled={disabled}
			classList={{
				primary: type === "primary",
				dashed: type === "dashed",
				small: size === "small",
				large: size === "large",
				danger: danger,
				loading: loading,
			}}
			{...others}
		>
			<Show when={loading}>
				<Spinner />
			</Show>
			{child}
		</button>
	);
}
