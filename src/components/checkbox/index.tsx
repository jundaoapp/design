import "./index.scss";
import {
	Accessor,
	createEffect,
	createSignal,
	JSX,
	mergeProps,
	on,
	Show,
	Signal,
	splitProps,
} from "solid-js";
import { Icon, Space, Text } from "@jundao/design";
import { processProps } from "@jundao/design/utilities";
import { IntrinsicComponentProps } from "@jundao/design/types";
import { Checkbox as KobalteCheckbox } from "@kobalte/core";
import { CheckboxRootOptions } from "@kobalte/core/dist/types/checkbox";
import "@jundao/design/label/index.scss";

export type CheckboxProps = IntrinsicComponentProps<
	"label",
	{
		checked?: boolean;
		defaultChecked?: boolean;
		onChange?: (checked: boolean) => void;
		size?: "small" | "default" | "large";
		indeterminate?: boolean;
		onIndeterminateChange?: (indeterminate: boolean) => void;
		danger?: boolean;
		label?: JSX.Element;
		required?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		children: never;
	} & Omit<
		CheckboxRootOptions,
		| "isChecked"
		| "defaultIsChecked"
		| "onCheckedChange"
		| "isIndeterminate"
		| "isRequired"
		| "isDisabled"
		| "isReadOnly"
		| "children"
	>
>;
export default function Checkbox(props: CheckboxProps) {
	const [local, others] = processProps({
		props,
		default: {
			defaultChecked: false,
			danger: false,
			size: "default",
			disabled: false,
		},
		keys: [
			"defaultChecked",
			"onChange",
			"checked",
			"required",
			"readonly",
			"size",
			"disabled",
			"onClick",
			"indeterminate",
			"onIndeterminateChange",
			"label",
			"danger",
		],
	});

	const [checked, setChecked] = createSignal(local.defaultChecked);

	const changeHandler = (value: boolean) => {
		setChecked(value);
		local.onChange?.(value);
		local.onIndeterminateChange?.(false);
	};

	return (
		<KobalteCheckbox.Root
			class="jdd checkbox"
			classList={{
				small: local.size === "small",
				large: local.size === "large",
				danger: local.danger,
			}}
			isChecked={local.checked ?? checked()}
			defaultIsChecked={local.defaultChecked}
			isIndeterminate={local.indeterminate}
			isRequired={local.required}
			isDisabled={local.disabled}
			onCheckedChange={changeHandler}
			{...others}
		>
			<KobalteCheckbox.Input />

			<Space align="center">
				<KobalteCheckbox.Control class="checkbox-control">
					<KobalteCheckbox.Indicator>
						<Icon icon="check" class="checkbox-check" />
						<Icon icon="subtract" class="checkbox-indeterminate" />
					</KobalteCheckbox.Indicator>
				</KobalteCheckbox.Control>
				<Show when={local.label}>
					<KobalteCheckbox.Label>
						<Show when={typeof local.label === "string"} fallback={local.label}>
							<Text>{local.label}</Text>
						</Show>
					</KobalteCheckbox.Label>
				</Show>
			</Space>
		</KobalteCheckbox.Root>
	);
}
