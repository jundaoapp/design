import "./index.scss";
import { Spinner } from "..";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { createEffect, Show } from "solid-js";
import ButtonGroup from "../button/group";
import { Button as KobalteButton } from "@kobalte/core";
import { mergeRefs } from "@solid-primitives/refs";

export type ButtonProps = IntrinsicComponentProps<
	"button",
	{
		type?: "primary" | "default";
		size?: "small" | "default" | "large";
		disabled?: boolean;
		danger?: boolean;
		loading?: boolean;
		href?: string;
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
		keys: [
			"children",
			"type",
			"size",
			"disabled",
			"danger",
			"loading",
			"onClick",
			"ref",
			"autofocus",
		],
	});

	let ref!: HTMLButtonElement;

	createEffect(() => {
		if (local.autofocus) setTimeout(() => ref.focus(), 1);
	});

	return (
		<KobalteButton.Root
			ref={mergeRefs((el) => (ref = el), local.ref)}
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
			onClick={local.loading ? undefined : local.onClick}
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
export { CompoundedButton as Button };
