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
		local.position === "left" ? context.sidebarLeft : context.sidebarRight;

	set(<div {...combinedProps} />);
}