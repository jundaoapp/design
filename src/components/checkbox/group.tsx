import {
	AriaCheckboxGroupProps,
	createCheckboxGroup,
} from "@solid-aria/primitives";

export type CheckboxGroupProps = Omit<AriaCheckboxGroupProps, "label">;

export default function CheckboxGroup(props: CheckboxGroupProps) {
	const { CheckboxGroupProvider, groupProps } = createCheckboxGroup(props);

	return (
		<div {...groupProps}>
			<CheckboxGroupProvider>{props.children}</CheckboxGroupProvider>
		</div>
	);
}
