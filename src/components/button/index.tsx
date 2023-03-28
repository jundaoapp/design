import "./index.scss";
import { Spinner } from "..";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { createMemo, Show } from "solid-js";
import ButtonGroup from "../button/group";
import { Button as KobalteButton, As } from "@kobalte/core";
import { createAutofocus } from "@solid-primitives/autofocus";
import { combineProps } from "@solid-primitives/props";

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
			"autofocus",
		],
	});

	let ref!: HTMLButtonElement;
	if (local.autofocus) createAutofocus(() => ref);

	const children = createMemo(() => local.children);

	const combinedProps = combineProps(others, {
		ref: (el) => (ref = el),
		class: "jdd button",
		get classList() {
			return {
				primary: local.type === "primary",
				small: local.size === "small",
				large: local.size === "large",
				danger: local.danger,
				loading: local.loading,
			};
		},
	});

	return (
		<KobalteButton.Root asChild isDisabled={local.disabled}>
			<As
				component={props.href !== undefined ? "a" : "button"}
				onClick={local.loading ? undefined : local.onClick}
				{...combinedProps}
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
