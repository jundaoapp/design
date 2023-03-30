import "./index.scss";
import { IntrinsicComponentProps } from "../types";
import { combineProps } from "@solid-primitives/props";
import { processProps } from "../utilities";
import { useLayoutContext } from "./context";
import { Portal } from "solid-js/web";

export type LayoutContentProps = IntrinsicComponentProps<"div", {}>;

export default function LayoutContent(props: LayoutContentProps) {
	const [local, others] = processProps({
		props,
		default: {},
		keys: [],
	});

	const context = useLayoutContext();

	const combinedProps = combineProps(props, {
		class: "jdd layout-content",
	});

	const [_, set] = context.content;

	set(<div {...combinedProps} />);
}
