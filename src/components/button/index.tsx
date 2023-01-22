import "./index.scss";
import { Spinner } from "@jundao/design";
import { IntrinsicComponentProps } from "@jundao/design/types";
import { processProps } from "@jundao/design/utilities";
import { Show, createMemo, JSX } from "solid-js";
import ButtonGroup from "@jundao/design/button/group";
import { Button as KobalteButton } from "@kobalte/core";
import { ButtonRootOptions } from "@kobalte/core/dist/types/button";

export type ButtonProps = IntrinsicComponentProps<
	"button",
	{
		type?: "primary" | "default";
		size?: "small" | "default" | "large";
		disabled?: boolean;
		danger?: boolean;
		loading?: boolean;
		href?: string;
		onClick?: never;
	} & Omit<ButtonRootOptions, "isDisabled" | "children">
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

	return (
		<KobalteButton.Root
			class="jdd button"
			isDisabled={local.disabled}
			classList={{
				primary: local.type === "primary",
				small: local.size === "small",
				large: local.size === "large",
				danger: local.danger,
				loading: local.loading,
			}}
			as={props.href !== undefined ? "a" : "button"}
			{...others}
		>
			<Show when={local.loading}>
				<Spinner />
			</Show>
			<Show when={typeof local.children === "string"} fallback={local.children}>
				<span class="button-text">{local.children}</span>
			</Show>
		</KobalteButton.Root>
	);
}

const CompoundedButton = Button as typeof Button & {
	Group: typeof ButtonGroup;
};
CompoundedButton.Group = ButtonGroup;
export default CompoundedButton;
