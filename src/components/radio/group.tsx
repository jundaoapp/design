import {
	createContext,
	createSignal,
	createUniqueId,
	JSXElement,
} from "solid-js";

export type RadioGroupProps = {
	name?: string;
	onChange?: (value: string | string[] | number) => void;
	children: JSXElement;
};
export type RadioGroupContextValue = [
	{ value?: string | string[] | number; name: string },
	{ setValue: (value: string | string[] | number) => void },
];
export const RadioGroupContext = createContext<RadioGroupContextValue>();

export default function RadioGroup(props: RadioGroupProps) {
	const [value, setValue] = createSignal<string | string[] | number>();

	const context: RadioGroupContextValue = [
		{
			value: value(),
			name: props.name ?? createUniqueId(),
		},
		{
			setValue: (value) => {
				setValue(value);
				if (typeof props.onChange === "function") props.onChange(value);
			},
		},
	];

	return (
		<RadioGroupContext.Provider value={context}>
			{props.children}
		</RadioGroupContext.Provider>
	);
}
