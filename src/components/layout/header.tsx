import "./index.scss";
import { IntrinsicComponentProps } from "../types";
import { combineProps } from "@solid-primitives/props";
import { processProps } from "../utilities";

export type LayoutHeaderProps = IntrinsicComponentProps<"div", {}>;

export default function LayoutHeader(props: LayoutHeaderProps) {
	const [local, others] = processProps({
		props,
		default: {},
		keys: [],
	});

	const combinedProps = combineProps(props, {
		class: "jdd layout-header",
	});

	return <div {...combinedProps} />;
}
