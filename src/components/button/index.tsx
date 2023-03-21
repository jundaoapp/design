import "./index.scss";
import { Spinner } from "..";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { createMemo, onMount, Show } from "solid-js";
import ButtonGroup from "../button/group";
import { Button as KobalteButton, As } from "@kobalte/core";
import { mergeRefs } from "@solid-primitives/refs";
import { createAutofocus } from "@solid-primitives/autofocus";

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
			"class",
		],
	});

	let ref!: HTMLButtonElement;
	if (local.autofocus) createAutofocus(() => ref);

	const children = createMemo(() => local.children);

	return (
		<KobalteButton.Root asChild isDisabled={local.disabled}>
			<As
				component={props.href !== undefined ? "a" : "button"}
				onClick={local.loading ? undefined : local.onClick}
				ref={mergeRefs((el) => (ref = el), local.ref)}
				class={["jdd button", local.class].join(" ")}
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
				<Show when={typeof children() === "string"} fallback={children()}>
					<span class="button-text">{children()}</span>
				</Show>
			</As>
		</KobalteButton.Root>
	);
}

const CompoundedButton = Button as typeof Button & {
	Group: typeof ButtonGroup;
};
CompoundedButton.Group = ButtonGroup;
export { CompoundedButton as Button };
