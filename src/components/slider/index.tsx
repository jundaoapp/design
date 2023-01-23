import "./index.scss";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Label, Spinner, Text } from "..";
import { JSX } from "solid-js/types/jsx";
import { createEffect, createSignal } from "solid-js";
import { mergeRefs } from "@solid-primitives/refs";

export type SliderProps = IntrinsicComponentProps<
	"input",
	{
		min?: number;
		max?: number;
		value?: number;
		defaultValue?: number;
		label?: string;
		onChange?: (value: number) => void;
		onInput?: (value: number) => void;
	}
>;

export function Slider(props: SliderProps) {
	const [local, others] = processProps({
		props,
		default: {
			min: 0,
			max: 100,
			defaulValue: 0,
		},
		keys: [
			"min",
			"max",
			"value",
			"defaultValue",
			"onChange",
			"onInput",
			"disabled",
			"label",
			"ref",
		],
	});

	let ref!: HTMLInputElement;

	const controlled =
		local.value !== undefined &&
		(local.onChange !== undefined || local.onInput !== undefined);

	const [liveValue, setLiveValue] = createSignal(
		controlled ? local.value : local.defaultValue,
	);

	const changeHandler: JSX.EventHandlerUnion<HTMLInputElement, Event> = (
		event,
	) => {
		local.onChange?.(Number(ref.value));
		if (controlled) {
			event.preventDefault();
			event.stopPropagation();
			ref.value = String(local.value);
		}
	};

	const inputHandler: JSX.EventHandlerUnion<HTMLInputElement, Event> = (
		event,
	) => {
		setLiveValue(Number(ref.value));
		if (local.onInput !== undefined) {
			local.onInput(liveValue()!);
			if (controlled) {
				event.preventDefault();
				event.stopPropagation();
				ref.value = String(local.value);
				setLiveValue(Number(ref.value));
			}
		}
	};

	createEffect(() => {
		setLiveValue(Number(ref.value));
	});

	const input = (
		<input
			ref={mergeRefs((el) => (ref = el), local.ref)}
			class="jdd slider"
			type="range"
			min={local.min}
			max={local.max}
			value={controlled ? local.value : local.defaultValue}
			disabled={local.disabled}
			aria-disabled={local.disabled}
			onChange={changeHandler}
			onInput={inputHandler}
			style={{
				"--jdd-inline-track-width": `${
					((liveValue() ?? 0) / local.max) * 100
				}%`,
			}}
			{...others}
		/>
	) as HTMLInputElement;

	if (local.label !== undefined) {
		return (
			<Label position="before" for={input}>
				{local.label}
			</Label>
		);
	}

	return input;
}
