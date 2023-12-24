import { combineProps } from "@solid-primitives/props";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import SidenavGroup from "./group";
import "./index.scss";
import SidenavLink from "./link";

export type SidenavProps = IntrinsicComponentProps<
	"nav",
	{
		transparentBackground?: boolean;
	}
>;

function Sidenav(props: SidenavProps) {
	const [local, others] = processProps({
		props,
		keys: ["children", "transparentBackground"],
	});

	const combinedProps = combineProps(others, {
		class: "jdd sidenav",
		get classList() {
			return {
				"transparent-background": local.transparentBackground,
			};
		},
	});

	return (
		<nav {...combinedProps}>
			<ul>{local.children}</ul>
		</nav>
	);
}

const CompoundedSidenav = Sidenav as typeof Sidenav & {
	Link: typeof SidenavLink;
	Group: typeof SidenavGroup;
};
CompoundedSidenav.Link = SidenavLink;
CompoundedSidenav.Group = SidenavGroup;
export { CompoundedSidenav as Sidenav };
