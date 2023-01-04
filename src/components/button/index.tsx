import "./index.scss";
import { Spinner } from "@jundao/design";
import { IntrinsicComponentProps } from "@jundao/design/types";
import { processProps } from "@jundao/design/utilities";
import { Show, mergeProps, splitProps } from "solid-js";
import ButtonGroup from "@jundao/design/button/group";

export type ButtonProps = IntrinsicComponentProps<
	"button",
	{
		type?: "primary" | "default";
		size?: "small" | "default" | "large";
		disabled?: boolean;
		danger?: boolean;
		loading?: boolean;
	}
>;

function Button(props: ButtonProps) {
	const [local, others] = processProps({
		props,
		default: {
			disabled: false,
			danger: false,
			loading: false,
		},
		keys: ["children", "type", "size", "disabled", "danger", "loading"],
	});

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
