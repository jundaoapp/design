import { Switch as KobalteSwitch } from "@kobalte/core";
import { createAutofocus } from "@solid-primitives/autofocus";
import { combineProps } from "@solid-primitives/props";
import {
	JSXElement,
	Match,
	Show,
	Switch as SolidSwitch,
	createMemo,
} from "solid-js";
import { Space, Spinner, Text } from "..";
import "../label/index.scss";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";

export type SwitchProps = IntrinsicComponentProps<
	"label",
	{
		defaultChecked?: boolean;
		onChange?: (checked: boolean) => void;
		checked?: boolean;
		disabled?: boolean;
		danger?: boolean;
		checkedChildren?: JSXElement;
		uncheckedChildren?: JSXElement;
		size?: "small" | "default" | "large";
		loading?: boolean;
		label?: string;
		readonly?: boolean;
		autofocus?: boolean;
	} & Omit<
		KobalteSwitch.SwitchRootProps,
		| "defaultIsChecked"
		| "isChecked"
		| "isDisabled"
		| "isReadOnly"
		| "onCheckedChange"
	>
>;

export function Switch(props: SwitchProps) {
	const [local, others] = processProps({
		props,
		default: {
			defaultChecked: false,
			disabled: false,
			size: "default",
			loading: false,
			danger: false,
		},
		keys: [
			"checkedChildren",
			"uncheckedChildren",
			"size",
			"loading",
			"danger",
			"label",
			"autofocus",
		],
	});

	let ref!: HTMLInputElement;
	if (local.autofocus) createAutofocus(() => ref);

	const label = createMemo(() => local.label);

	const combinedProps = combineProps(others, {
		class: "jdd switch",
	});

	return (
		<KobalteSwitch.Root {...combinedProps}>
			<KobalteSwitch.Input ref={ref} />
			<Space>
				<KobalteSwitch.Control
					class="switch-control"
					classList={{
						small: local.size === "small",
						large: local.size === "large",
						loading: local.loading,
						danger: local.danger,
					}}
				>
					<KobalteSwitch.Thumb class="switch-thumb">
						<Show when={local.loading}>
							<Spinner />
						</Show>
					</KobalteSwitch.Thumb>
					<div class="switch-inner">
						<span class="switch-checked">{local.checkedChildren}</span>
						<span class="switch-unchecked">{local.uncheckedChildren}</span>
					</div>
				</KobalteSwitch.Control>

				<SolidSwitch>
					<Match when={typeof label() === "string"}>
						<KobalteSwitch.Label>
							<Text>{label()}</Text>
						</KobalteSwitch.Label>
					</Match>
					<Match when={label() !== undefined && typeof label() !== "string"}>
						<KobalteSwitch.Label>
							<Text>{label()}</Text>
						</KobalteSwitch.Label>
					</Match>
				</SolidSwitch>
			</Space>
		</KobalteSwitch.Root>
	);
}
