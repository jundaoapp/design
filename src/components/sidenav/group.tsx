import { Collapsible } from "@kobalte/core";
import { combineProps } from "@solid-primitives/props";
import { RiArrowsArrowDownSLine } from "solid-icons/ri";
import { ComponentProps } from "solid-js";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";

export type SidenavGroupProps = IntrinsicComponentProps<
	"li",
	{
		label: string;
		open?: boolean;
		onChange?: (open: boolean) => void;
		defaultOpen?: boolean;
		disabled?: boolean;
	}
>;

export default function SidenavGroup(props: SidenavGroupProps) {
	const [local, others] = processProps({
		props,
		default: {
			defaultOpen: false,
		},
		keys: ["children", "label", "open", "onChange", "defaultOpen", "disabled"],
	});

	const combinedProps = combineProps(others, {
		class: "jdd sidenav-group",
		get classList() {
			return {};
		},
	});

	return (
		<Collapsible.Root
			open={local.open}
			defaultOpen={local.defaultOpen}
			onOpenChange={local.onChange}
			as="li"
			role="group"
			disabled={local.disabled}
			{...(combinedProps as ComponentProps<typeof Collapsible.Root>)}
		>
			<Collapsible.Trigger class="sidenav-group-toggle">
				<span>{local.label}</span>
				<RiArrowsArrowDownSLine />
			</Collapsible.Trigger>
			<Collapsible.Content class="sidenav-group-content" as="ul">
				{local.children}
			</Collapsible.Content>
		</Collapsible.Root>
	);
}
