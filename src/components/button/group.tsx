import { combineProps } from "@solid-primitives/props";
import { Button } from "..";
import { IntrinsicComponentProps } from "../types";
import "./index.scss";

export type ButtonGroupProps = IntrinsicComponentProps<
	"div",
	{
		children: ReturnType<typeof Button>;
	}
>;

export default function ButtonGroup(props: ButtonGroupProps) {
	const combinedProps = combineProps(props, {
		class: "jdd button-group",
	});

	return <div role="group" {...combinedProps} />;
}
