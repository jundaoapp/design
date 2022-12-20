import "./index.scss";
import { Spinner } from "@jundao/design";
import { Show, ComponentProps, mergeProps, splitProps } from "solid-js";
import ButtonGroup from "@jundao/design/button/group";

export type ButtonProps = Omit<ComponentProps<"button">, "type"> & {
	type?: "primary" | "default" | "dashed";
	size?: "small" | "default" | "large";
	disabled?: boolean;
	danger?: boolean;
	loading?: boolean;
};

const defaultProps = {
	disabled: false,
	danger: false,
	loading: false,
};

function Button(props: ButtonProps) {
	const [local, others] = splitProps(mergeProps(defaultProps, props), [
		"children",
		"type",
		"size",
		"disabled",
		"danger",
		"loading",
	]);

	const child =
		typeof local.children === "string" ? (
			<span>{local.children}</span>
		) : (
			local.children
		);

	return (
		<button
			class="jdd button"
			disabled={local.disabled}
			classList={{
				primary: local.type === "primary",
				dashed: local.type === "dashed",
				small: local.size === "small",
				large: local.size === "large",
				danger: local.danger,
				loading: local.loading,
			}}
			{...others}
		>
			<Show when={local.loading}>
				<Spinner />
			</Show>
			{child}
		</button>
	);
}

const CompoundedButton = Button as typeof Button & {
	Group: typeof ButtonGroup;
};
CompoundedButton.Group = ButtonGroup;
export default CompoundedButton;
