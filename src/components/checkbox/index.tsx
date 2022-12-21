import "./index.scss";
import { JSX } from "solid-js/types/jsx";
import {
	ComponentProps,
	createEffect,
	createSignal,
	mergeProps,
	on,
	splitProps,
} from "solid-js";
import { Label } from "@jundao/design";

export type CheckboxProps = Omit<ComponentProps<"input">, "onChange"> & {
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	size?: "small" | "default" | "large";
	indeterminate?: boolean;
	danger?: boolean;
	label?: string;
};

const defaultProps = {
	defaultChecked: false,
	danger: false,
	size: "default",
	disabled: false,
};

export default function Checkbox(props: CheckboxProps) {
	const [local, others] = splitProps(mergeProps(defaultProps, props), [
		"defaultChecked",
		"onChange",
		"checked",
		"size",
		"disabled",
		"onClick",
		"indeterminate",
		"value",
		"label",
		"danger",
	]);

	let ref!: HTMLInputElement;

	createEffect(
		on(
			() => props.indeterminate,
			(indeterminate) => {
				if (indeterminate !== undefined) ref.indeterminate = indeterminate;
				if (indeterminate === true) {
					setChecked(false);
				}
			},
		),
	);

	const controlled =
		props.checked !== undefined && local.onChange !== undefined;

	const [checked, setChecked] = createSignal(
		controlled ? !!props.checked : !props.indeterminate && local.defaultChecked,
	);

	createEffect(
		on(
			() => props.checked,
			(checked) => {
				if (checked !== undefined) setChecked(checked);
			},
		),
	);

	createEffect(
		on(
			() => checked(),
			(checked) => {
				setTimeout(() => {
					ref.checked = checked;
				});
			},
		),
	);

	const clickHandler: JSX.EventHandler<HTMLInputElement, MouseEvent> = (
		event,
	) => {
		if (!local.disabled) {
			if (typeof local.onChange === "function")
				local.onChange(controlled ? !props.checked : !checked());
			if (!controlled) setChecked(!checked());
		}
		if (controlled) event.preventDefault();

		if (typeof local.onClick === "function") local.onClick(event);
	};

	const input = (
		<input
			ref={ref}
			class="jdd checkbox"
			type="checkbox"
			classList={{
				small: local.size === "small",
				large: local.size === "large",
				danger: local.danger,
			}}
			disabled={local.disabled}
			checked={checked()}
			onClick={clickHandler}
			value={props.indeterminate === true ? "indeterminate" : local.value}
			{...others}
		/>
	) as HTMLInputElement;

	if (local.label !== undefined) {
		return <Label for={input}>{local.label}</Label>;
	}

	return input;
}
