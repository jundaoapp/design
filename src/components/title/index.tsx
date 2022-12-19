import "./index.scss";
import { ComponentProps, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

export type TitleProps = RequiredChildren<ComponentProps<"h1">> & {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
};

const defaultProps = {
	level: 1,
};

export default function Title(props: TitleProps) {
	const [local, others] = splitProps(mergeProps(defaultProps, props), [
		"level",
	]);

	return (
		<Dynamic
			component={`h${local.level}`}
			class="jdd title jdd-typography"
			{...others}
		/>
	);
}
