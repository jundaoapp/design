import "./index.scss";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Placement } from "@kobalte/core/dist/types/popper/utils";
import { DropdownMenu } from "@kobalte/core";
import { Button, Icon, Card, ButtonProps } from "..";
import { MenuContentOptions } from "@kobalte/core/dist/types/menu";
import { DropdownItem } from "./item";
import { DropdownGroup } from "./group";
import { DropdownCheckbox } from "./checkbox";
import { DropdownRadio } from "./radio";
import { DropdownRadioGroup } from "./radio-group";
import { DropdownSubmenu } from "./submenu";
import { JSXElement, Show } from "solid-js";

export type DropdownProps = IntrinsicComponentProps<
	"div",
	{
		label?: string;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		placement?: Placement;
		customTrigger?: JSXElement;
		type?: "primary" | "default";
		size?: "small" | "default" | "large";
		disabled?: boolean;
		danger?: boolean;
	} & MenuContentOptions
>;

function Dropdown(props: DropdownProps) {
	const [local, others] = processProps({
		props,
		keys: [
			"label",
			"open",
			"onOpenChange",
			"placement",
			"children",
			"customTrigger",
			"type",
			"size",
			"disabled",
			"danger",
		],
	});

	return (
		<DropdownMenu.Root
			isModal={false}
			isOpen={local.open}
			onOpenChange={local.onOpenChange}
			placement={local.placement}
		>
			<DropdownMenu.Trigger
				as="div"
				class="jdd dropdown-trigger"
				isDisabled={local.disabled}
			>
				<Show
					when={local.customTrigger}
					keyed
					fallback={
						<Button
							type={local.type}
							size={local.size}
							disabled={local.disabled}
							danger={local.danger}
						>
							{local.label}{" "}
							<DropdownMenu.Icon class="dropdown-trigger-icon">
								<Icon icon="arrow-down-s" line />
							</DropdownMenu.Icon>
						</Button>
					}
				>
					{(customTrigger) => customTrigger}
				</Show>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content class="jdd dropdown" {...others}>
					<DropdownMenu.Arrow class="dropdown-arrow" />
					<Card contrastBackground noPadding size="small">
						{local.children}
					</Card>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}

const CompoundedDropdown = Dropdown as typeof Dropdown & {
	Checkbox: typeof DropdownCheckbox;
	Group: typeof DropdownGroup;
	Item: typeof DropdownItem;
	Radio: typeof DropdownRadio;
	RadioGroup: typeof DropdownRadioGroup;
	Submenu: typeof DropdownSubmenu;
};
CompoundedDropdown.Checkbox = DropdownCheckbox;
CompoundedDropdown.Group = DropdownGroup;
CompoundedDropdown.Item = DropdownItem;
CompoundedDropdown.Radio = DropdownRadio;
CompoundedDropdown.RadioGroup = DropdownRadioGroup;
CompoundedDropdown.Submenu = DropdownSubmenu;
export { CompoundedDropdown as Dropdown };
