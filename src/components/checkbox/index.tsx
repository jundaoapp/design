import { Checkbox as KobalteCheckbox } from "@kobalte/core";
import { createAutofocus } from "@solid-primitives/autofocus";
import { combineProps } from "@solid-primitives/props";
import { RiSystemCheckFill, RiSystemSubtractFill } from "solid-icons/ri";
import { JSX, Show, createMemo, createSignal } from "solid-js";
import { Space, Text } from "..";
import "../label/index.scss";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";

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
		autofocus?: boolean;
		children?: never;
	} & Omit<KobalteCheckbox.CheckboxRootProps, "children">
>;
export function Checkbox(props: CheckboxProps) {
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
			"size",
			"disabled",
			"onClick",
			"onIndeterminateChange",
			"label",
			"danger",
			"autofocus",
		],
	});

	const [checked, setChecked] = createSignal(local.defaultChecked);

	const changeHandler = (value: boolean) => {
		setChecked(value);
		local.onChange?.(value);
		local.onIndeterminateChange?.(false);
	};

	let ref!: HTMLInputElement;
	if (local.autofocus) createAutofocus(() => ref);

	const label = createMemo(() => local.label);

	const combinedProps = combineProps(others, {
		class: "jdd checkbox",
		get classList() {
			return {
				small: local.size === "small",
				large: local.size === "large",
				danger: local.danger,
			};
		},
	});

	return (
		<KobalteCheckbox.Root
			checked={local.checked ?? checked()}
			onChange={changeHandler}
			{...combinedProps}
		>
			<KobalteCheckbox.Input ref={ref} />

			<Space align="center">
				<KobalteCheckbox.Control class="checkbox-control">
					<KobalteCheckbox.Indicator>
						<RiSystemCheckFill class="checkbox-check" />
						<RiSystemSubtractFill class="checkbox-indeterminate" />
					</KobalteCheckbox.Indicator>
				</KobalteCheckbox.Control>
				<Show when={label()}>
					<KobalteCheckbox.Label>
						<Show when={typeof label() === "string"} fallback={label()}>
							<Text>{label()}</Text>
						</Show>
					</KobalteCheckbox.Label>
				</Show>
			</Space>
		</KobalteCheckbox.Root>
	);
}
