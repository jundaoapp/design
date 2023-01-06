import { AriaRadioGroupProps, createRadioGroup } from "@solid-aria/primitives";

export type RadioGroupProps = Omit<AriaRadioGroupProps, "label">;

export default function RadioGroup(props: RadioGroupProps) {
	const { RadioGroupProvider, groupProps } = createRadioGroup(props);

	return (
		<div {...groupProps}>
			<RadioGroupProvider>{props.children}</RadioGroupProvider>
		</div>
	);
}
