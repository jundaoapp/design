import "./index.scss";
import { Spinner } from "@jundao/design";
import { IntrinsicComponentProps } from "@jundao/design/types";
import { processProps } from "@jundao/design/utilities";
import { Show, mergeProps } from "solid-js";
import ButtonGroup from "@jundao/design/button/group";
import { AriaButtonProps, createButton } from "@solid-aria/button";

export type ButtonProps = IntrinsicComponentProps<
	"button",
	{
		type?: "primary" | "default";
		size?: "small" | "default" | "large";
		disabled?: boolean;
		danger?: boolean;
		loading?: boolean;
		onClick?: never;
	} & Omit<AriaButtonProps, "isDisabled" | "onClick">
>;

function Button(props: ButtonProps) {
	const [local, others] = processProps({
		props,
		default: {
			disabled: false,
			danger: false,
			loading: false,
			preventFocusOnPress: true,
		},
		keys: ["children", "type", "size", "disabled", "danger", "loading"],
	});

	let ref!: HTMLButtonElement;

	const { buttonProps, isPressed } = createButton(
		mergeProps(
			{
				isDisabled: local.disabled,
			},
			others,
		) as AriaButtonProps,
		() => ref,
	);

	const child =
		typeof local.children === "string" ? (
			<span>{local.children}</span>
		) : (
			local.children
		);

	return (
		<button
			ref={ref}
			class="jdd button"
			disabled={local.disabled}
			classList={{
				primary: local.type === "primary",
				small: local.size === "small",
				large: local.size === "large",
				danger: local.danger,
				loading: local.loading,
				pressed: isPressed(),
			}}
			{...buttonProps}
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
