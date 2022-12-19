import "./index.scss";
import {
	ComponentProps,
	createEffect,
	createSignal,
	JSXElement,
	mergeProps,
	on,
	Show,
	splitProps,
} from "solid-js";
import { Spinner } from "@jundao/design";
import { JSX } from "solid-js/types/jsx";

export type SwitchProps = Omit<
	ComponentProps<"button">,
	"children" | "onChange"
> & {
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
	checked?: boolean;
	disabled?: boolean;
	checkedChildren?: JSXElement;
	uncheckedChildren?: JSXElement;
	size?: "small" | "default" | "large";
	loading?: boolean;
};

const defaultProps = {
	defaultChecked: false,
	disabled: false,
	size: "default",
	loading: false,
};

export default function Switch(props: SwitchProps) {
	const [local, others] = splitProps(mergeProps(defaultProps, props), [
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

	const controlled =
		props.checked !== undefined && local.onChange !== undefined;

	const [checked, setChecked] = createSignal(
		controlled ? !!props.checked : local.defaultChecked,
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
		if (!local.disabled) {
			if (typeof local.onChange === "function")
				local.onChange(controlled ? !local.checked : !checked());
			if (!controlled) setChecked(!checked());
		}

		if (typeof local.onClick === "function") local.onClick(event);
	};

	return (
		<button
			type="button"
			role="switch"
			aria-checked={checked()}
			onClick={clickHandler}
			class="jdd switch"
			disabled={local.disabled}
			{...others}
			classList={{
				small: local.size === "small",
				large: local.size === "large",
				loading: local.loading,
			}}
		>
			<div class="handle">
				<Show when={local.loading}>
					<Spinner />
				</Show>
			</div>
			<div class="inner">
				<span class="checked">{local.checkedChildren}</span>
				<span class="unchecked">{local.uncheckedChildren}</span>
			</div>
		</button>
	);
}
