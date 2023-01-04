import "./index.scss";
import { ComponentProps, mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { processProps } from "@jundao/design/utilities";
import { IntrinsicComponentProps } from "@jundao/design/types";

export type TitleProps = IntrinsicComponentProps<
	"h1",
	{
		level?: 1 | 2 | 3 | 4 | 5 | 6;
	}
>;

export default function Title(props: TitleProps) {
	const [local, others] = processProps({
		props,
		default: {
			level: 1,
		},
		keys: ["level"],
	});

	return (
		<Dynamic
			component={`h${local.level}`}
			class="jdd title jdd-typography"
			{...others}
		/>
	);
}
