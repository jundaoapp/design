import "./index.scss";
import { IntrinsicComponentProps } from "../types";
import { combineProps } from "@solid-primitives/props";
import { processProps } from "../utilities";

export type LayoutFooterProps = IntrinsicComponentProps<"div", {}>;

export default function LayoutFooter(props: LayoutFooterProps) {
	const [local, others] = processProps({
		props,
		default: {},
		keys: [],
	});

	const combinedProps = combineProps(props, {
		class: "jdd layout-footer",
	});

	return <div {...combinedProps} />;
}
