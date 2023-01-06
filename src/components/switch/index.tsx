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
import { processProps } from "@jundao/design/utilities";
import { IntrinsicComponentProps } from "@jundao/design/types";
import {
	AriaSwitchProps,
	createFocusRing,
	createPress,
	createSwitch,
	createVisuallyHidden,
} from "@solid-aria/primitives";
import {mergeRefs} from "@solid-primitives/refs";

export type SwitchProps = IntrinsicComponentProps<
	"button",
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
		inputProps: JSX.InputHTMLAttributes<HTMLInputElement>;
		onClick?: never;
	} & Omit<AriaSwitchProps, "isSelected" | "defaultSelected">
>;

export default function Switch(props: SwitchProps) {
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
			"inputProps",
			"name",
			"value",
            "ref",
		],
	});

	let ref!: HTMLInputElement;
	let buttonRef!: HTMLButtonElement;

	const { inputProps, state } = createSwitch(
		{
			onChange: local.onChange,
			isSelected: local.checked,
			isDisabled: local.disabled,
			name: local.name,
			value: local.value,
		},
		() => ref,
	);
	const { isFocusVisible, focusProps } = createFocusRing();
	const { visuallyHiddenProps } = createVisuallyHidden();

	const { pressProps, isPressed } = createPress(
		{
			isDisabled: local.disabled,
			preventFocusOnPress: true,
			onPress: () => {
				state.setSelected(!state.isSelected());
			},
		},
		() => buttonRef,
	);

	return (
		<label>
			<div {...visuallyHiddenProps}>
				<input
					{...mergeProps(inputProps, local.inputProps)}
					{...focusProps}
					ref={ref}
				/>
			</div>
			<button
                ref={mergeRefs(el => (buttonRef = el), local.ref)}
				aria-hidden="true"
				type="button"
				role="switch"
				aria-checked={state.isSelected()}
				class="jdd switch"
				tabindex={-1}
				disabled={local.disabled}
				classList={{
					small: local.size === "small",
					large: local.size === "large",
					loading: local.loading,
					danger: local.danger,
					pressed: isPressed(),
					"focus-ring": isFocusVisible(),
				}}
				{...others}
				{...pressProps}
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
		</label>
	);
}
