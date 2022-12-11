import "./index.scss";
import { JSX } from "solid-js/types/jsx";
import { createEffect, createSignal, on, splitProps } from "solid-js";
import { colors } from "@storybook/addon-interactions/dist/ts3.9/theme";

export type CheckboxProps = JSX.IntrinsicElements["input"] & {
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	size?: "small" | "default" | "large";
	indeterminate?: boolean;
};

export default function Checkbox(props: CheckboxProps) {
	const [
		{
			defaultChecked = false,
			onChange,
			size = "default",
			disabled = false,
			onClick,
			value,
		},
		others,
	] = splitProps(props, [
		"defaultChecked",
		"onChange",
		"checked",
		"size",
		"disabled",
		"onClick",
		"indeterminate",
		"value",
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

	const controlled = props.checked !== undefined && onChange !== undefined;

	const [checked, setChecked] = createSignal(
		controlled ? !!props.checked : !props.indeterminate && defaultChecked,
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
		if (!disabled) {
			if (typeof onChange === "function")
				onChange(controlled ? !props.checked : !checked());
			if (!controlled) setChecked(!checked());
		}
		if (controlled) event.preventDefault();

		if (typeof onClick === "function") onClick(event);
	};

	return (
		<input
			ref={ref}
			class="jdd checkbox"
			type="checkbox"
			classList={{
				small: size === "small",
				large: size === "large",
			}}
			disabled={disabled}
			checked={checked()}
			onClick={clickHandler}
			value={props.indeterminate === true ? "indeterminate" : value}
			{...others}
		/>
	);
}
