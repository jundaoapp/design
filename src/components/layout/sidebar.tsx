import "./index.scss";
import { IntrinsicComponentProps } from "../types";
import { combineProps } from "@solid-primitives/props";
import { processProps } from "../utilities";
import { useLayoutContext } from "./context";

export type LayoutSidebarProps = IntrinsicComponentProps<
	"div",
	{
		position?: "right" | "left";
	}
>;

export default function LayoutSidebar(props: LayoutSidebarProps) {
	const [local, others] = processProps({
		props,
		default: {
			position: "left",
		},
		keys: ["position"],
	});

	const context = useLayoutContext();

	const combinedProps = combineProps(props, {
		class: "jdd layout-sidebar",
	});

	const [_, set] =
		context[
			`sidebar${local
				.position!.charAt(0)
				.toUpperCase()}${local.position!.substring(1)}`
		];

	set(<div {...combinedProps} />);
}
