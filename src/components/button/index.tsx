import { JSXElement, splitProps } from "solid-js";
import "./index.scss";
import { JSX } from "solid-js/types/jsx";

export type ButtonProps =
	& JSX.IntrinsicElements["button"]
	& {
		children: JSXElement,
		type?: "primary" | "default" | "dashed",
		size?: "small" | "default" | "large",
		disabled?: boolean,
		danger?: boolean,
	};

export default function Button(props: ButtonProps) {
	const [{ children, type, size, disabled = false, danger }, others] = splitProps(
		props,
		["children", "type", "size", "disabled", "danger"],
	);

	return (
		<button
            class="jdd"
            disabled={disabled}
            classList={{
                primary: type === "primary",
                dashed: type === "dashed",
                small: size === "small",
                large: size === "large",
                danger: danger === true,
        }}
            {...others}
        >
            {children}
        </button>
	);
}
