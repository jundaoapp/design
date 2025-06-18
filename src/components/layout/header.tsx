import { combineProps } from "@solid-primitives/props";
import type { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.css";

export type LayoutHeaderProps = IntrinsicComponentProps<"header", object>;

export default function LayoutHeader(props: LayoutHeaderProps) {
	const [_local, _others] = processProps({
		props,
		default: {},
		keys: [],
	});

	const combinedProps = combineProps(props, {
		class: "jdd layout-header",
	});

	return <header {...combinedProps} />;
}
