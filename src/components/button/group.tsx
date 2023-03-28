import "./index.scss";
import { Button } from "..";
import { IntrinsicComponentProps } from "../types";
import { combineProps } from "@solid-primitives/props";

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
