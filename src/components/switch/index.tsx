import "./index.scss";
import { JSX } from "solid-js/types/jsx";
import {
	createEffect,
	createSignal,
	JSXElement,
	on,
	Show,
	splitProps,
} from "solid-js";
import { Spinner } from "@jundao/design";

export type SwitchProps = Omit<JSX.IntrinsicElements["button"], "children"> & {
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	checked?: boolean;
	disabled?: boolean;
	checkedChildren?: JSXElement;
	uncheckedChildren?: JSXElement;
	size?: "small" | "default" | "large";
	loading?: boolean;
};

export default function Switch(props: SwitchProps) {
	const [
		{
			defaultChecked = false,
			onChange,
			disabled = false,
			checkedChildren,
			uncheckedChildren,
			onClick,
			size = "default",
			loading = false,
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
		"loading",
	]);

	const controlled = props.checked !== undefined && onChange !== undefined;

	const [checked, setChecked] = createSignal(
		controlled ? !!props.checked : defaultChecked,
	);

	createEffect(
		on(
			() => props.checked,
			(checked) => {
				if (checked !== undefined) setChecked(checked);
			},
		),
	);

	const clickHandler: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (
		event,
	) => {
		if (!disabled) {
			if (typeof onChange === "function")
				onChange(controlled ? !props.checked : !checked());
			if (!controlled) setChecked(!checked());
		}

		if (typeof onClick === "function") onClick(event);
	};

	return (
		<button
			type="button"
			role="switch"
			aria-checked={checked()}
			onClick={clickHandler}
			class="jdd switch"
			disabled={disabled}
			{...others}
			classList={{
				small: size === "small",
				large: size === "large",
				loading: loading,
			}}
		>
			<div class="handle">
				<Show when={loading}>
					<Spinner />
				</Show>
			</div>
			<div class="inner">
				<span class="checked">{checkedChildren}</span>
				<span class="unchecked">{uncheckedChildren}</span>
			</div>
		</button>
	);
}
