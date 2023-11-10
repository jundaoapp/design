import { As, Button as KobalteButton } from "@kobalte/core";
import { createAutofocus } from "@solid-primitives/autofocus";
import { combineProps } from "@solid-primitives/props";
import { Show, createMemo } from "solid-js";
import { Spinner } from "..";
import ButtonGroup from "../button/group";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";

export type ButtonProps = IntrinsicComponentProps<
	"button",
	{
		type?: "primary" | "default";
		size?: "small" | "default" | "large";
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
		ref: (el) => {
			ref = el;
		},
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
		<KobalteButton.Root asChild>
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
