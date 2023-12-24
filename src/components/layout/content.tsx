import { combineProps } from "@solid-primitives/props";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import { useLayoutContext } from "./context";
import "./index.scss";

export type LayoutContentProps = IntrinsicComponentProps<"div", object>;

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

	return <></>;
}
