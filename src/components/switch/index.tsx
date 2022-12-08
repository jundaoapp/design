import "./index.scss";
import { JSX } from "solid-js/types/jsx";
import { createSignal, JSXElement, splitProps } from "solid-js";

export type SwitchProps = Omit<JSX.IntrinsicElements["button"], "children"> & {
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	checked?: boolean;
	disabled?: boolean;
	checkedChildren?: JSXElement;
	uncheckedChildren?: JSXElement;
	size?: "small" | "default" | "large";
};

export default function Switch(props: SwitchProps) {
	const [
		{
			checked: checkedProp,
			defaultChecked = false,
			onChange,
			disabled = false,
			checkedChildren,
			uncheckedChildren,
			onClick,
			size = "default",
		},
		others,
	] = splitProps(props, [
		"checked",
		"defaultChecked",
		"disabled",
		"checkedChildren",
		"uncheckedChildren",
		"onClick",
		"onChange",
		"size",
	]);

	const controlled = checkedProp != undefined && onChange != undefined;

	const [checked, setChecked] = createSignal(
		controlled ? !!checkedProp : defaultChecked,
	);

	const clickHandler = () => {
		if (!disabled) setChecked(controlled ? !checkedProp : !checked());

		if (typeof onClick === "function") onClick();
		if (typeof onChange === "function") onChange(checked());
	};

	console.log(checkedChildren, uncheckedChildren);

	return (
		<button
			type="button"
			role="switch"
			aria-checked={controlled ? checkedProp : checked()}
			onClick={clickHandler}
			class="jdd switch"
			disabled={disabled}
			{...others}
			classList={{
				small: size === "small",
				large: size === "large",
			}}
		>
			<div class="handle" />
			<div class="inner">
				<span class="checked">{checkedChildren}</span>
				<span class="unchecked">{uncheckedChildren}</span>
			</div>
		</button>
	);
}
