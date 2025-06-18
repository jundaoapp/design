import { combineProps } from "@solid-primitives/props";
import type { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.css";

export type LayoutFooterProps = IntrinsicComponentProps<"footer", object>;

export default function LayoutFooter(props: LayoutFooterProps) {
	const [_local, _others] = processProps({
		props,
		default: {},
		keys: [],
	});

	const combinedProps = combineProps(props, {
		class: "jdd layout-footer",
	});

	return <footer {...combinedProps} />;
}
