import "./index.scss";
import { Dynamic } from "solid-js/web";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { combineProps } from "@solid-primitives/props";

export type TitleProps = IntrinsicComponentProps<
	"h1",
	{
		level?: 1 | 2 | 3 | 4 | 5 | 6;
	}
>;

export function Title(props: TitleProps) {
	const [local, others] = processProps({
		props,
		default: {
			level: 1,
		},
		keys: ["level"],
	});

	const combinedProps = combineProps(others, {
		class: "jdd title jdd-typography",
	});

	return <Dynamic component={`h${local.level}`} {...combinedProps} />;
}
