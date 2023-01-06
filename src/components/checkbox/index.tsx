import "./index.scss";
import { createEffect, mergeProps, on, Signal, splitProps } from "solid-js";
import { Label } from "@jundao/design";
import { processProps } from "@jundao/design/utilities";
import { IntrinsicComponentProps } from "@jundao/design/types";
import {
	AriaCheckboxProps,
	createCheckbox,
	useCheckboxGroupContext,
} from "@solid-aria/primitives";
import CheckboxGroup from "@jundao/design/checkbox/group";
import { mergeRefs } from "@solid-primitives/refs";

export type CheckboxProps = IntrinsicComponentProps<
	"input",
	{
		defaultChecked?: boolean;
		onChange?: (checked: boolean) => void;
		size?: "small" | "default" | "large";
		indeterminate?: boolean | Signal<boolean>;
		danger?: boolean;
		label?: string;
	} & Omit<
		AriaCheckboxProps,
		| "isIndeterminate"
		| "defaultSelected"
		| "isSelected"
		| "onChange"
		| "isDisabled"
	>
>;
function Checkbox(props: CheckboxProps) {
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
			"indeterminate",
			"label",
			"danger",
			"ref",
		],
	});

	let ref!: HTMLInputElement;

	let checkboxGroupProps = {};

	try {
		const context = useCheckboxGroupContext();
		const onChange = (isSelected: boolean) => {
			if (local.disabled || context.state.isDisabled()) {
				return;
			}

			isSelected
				? context.state.addValue(props.value ?? "undefined")
				: context.state.removeValue(props.value ?? "undefined");

			props.onChange?.(isSelected);
		};

		checkboxGroupProps = {
			get isReadOnly() {
				return props.isReadOnly || context.state.isReadOnly();
			},
			get isSelected() {
				return context.state.isSelected(props.value ?? "undefined");
			},
			get isDisabled() {
				return local.disabled || context.state.isDisabled();
			},
			get name() {
				return props.name || context.name();
			},
			onChange,
		};
	} catch (error) {
		if (
			error instanceof Error &&
			error.message !==
				"[solid-aria]: useCheckboxGroupContext should be used in a CheckboxGroupProvider."
		)
			throw error;
	}

	const { inputProps, state } = createCheckbox(
		mergeProps(
			{
				isIndeterminate: unwrapIndeterminate(local.indeterminate),
				defaultSelected: local.defaultChecked,
				isSelected: local.checked,
				onChange: local.onChange,
				isDisabled: local.disabled,
			},
			checkboxGroupProps,
			others,
		) as AriaCheckboxProps,
		() => ref,
	);

	createEffect(
		on(
			() => state.isSelected(),
			(selected) => {
				if (selected && Array.isArray(local.indeterminate))
					local.indeterminate[1](false);
			},
		),
	);

	createEffect(
		on(
			() => unwrapIndeterminate(local.indeterminate),
			(indeterminate) => {
				if (indeterminate !== undefined) ref.indeterminate = indeterminate;
				if (indeterminate) {
					state.setSelected(false);
				}
			},
		),
	);

	const otherInputProps = splitProps(inputProps, ["aria-checked"])[1];

	const input = (
		<input
			ref={mergeRefs((el) => (ref = el), local.ref)}
			class="jdd checkbox"
			classList={{
				small: local.size === "small",
				large: local.size === "large",
				danger: local.danger,
			}}
			checked={state.isSelected()}
			aria-checked={
				unwrapIndeterminate(local.indeterminate) ? "mixed" : state.isSelected()
			}
			{...otherInputProps}
		/>
	) as HTMLInputElement;

	if (local.label !== undefined) {
		return <Label for={input}>{local.label}</Label>;
	}

	return input;
}

function unwrapIndeterminate(
	indeterminate?: boolean | Signal<boolean>,
): boolean | undefined {
	return Array.isArray(indeterminate) ? indeterminate[0]() : indeterminate;
}

const CompoundedCheckbox = Checkbox as typeof Checkbox & {
	Group: typeof CheckboxGroup;
};
CompoundedCheckbox.Group = CheckboxGroup;
export default CompoundedCheckbox;
