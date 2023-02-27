import "./index.scss";
import "../label/index.scss";
import {
	JSXElement,
	Match,
	Show,
	Switch as SolidSwitch,
	createSignal,
} from "solid-js";
import { Space, Spinner, Text } from "..";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Switch as KobalteSwitch } from "@kobalte/core";
import { SwitchRootOptions } from "@kobalte/core/dist/types/switch";
import { createAutofocus } from "@solid-primitives/autofocus";

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
		SwitchRootOptions,
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
			"checked",
			"defaultChecked",
			"disabled",
			"checkedChildren",
			"uncheckedChildren",
			"onChange",
			"size",
			"loading",
			"danger",
			"readonly",
			"label",
			"autofocus",
		],
	});

	let ref!: HTMLInputElement;
	if (local.autofocus) createAutofocus(() => ref);

	return (
		<KobalteSwitch.Root
			class="jdd switch"
			defaultIsChecked={local.defaultChecked}
			isChecked={local.checked}
			isDisabled={local.disabled}
			isReadOnly={local.readonly}
			onCheckedChange={local.onChange}
			{...others}
		>
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
					<Match when={typeof local.label === "string"}>
						<KobalteSwitch.Label>
							<Text>{local.label}</Text>
						</KobalteSwitch.Label>
					</Match>
					<Match
						when={local.label !== undefined && typeof local.label !== "string"}
					>
						<KobalteSwitch.Label>
							<Text>{local.label}</Text>
						</KobalteSwitch.Label>
					</Match>
				</SolidSwitch>
			</Space>
		</KobalteSwitch.Root>
	);
}
