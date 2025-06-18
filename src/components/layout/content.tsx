import { combineProps } from "@solid-primitives/props";
import type { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { useLayoutContext } from "./context";
import "./index.css";

export type LayoutContentProps = IntrinsicComponentProps<"div", object>;

export default function LayoutContent(props: LayoutContentProps) {
	const [_local, _others] = processProps({
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

	return <></>;
}
