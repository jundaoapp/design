import "./index.scss";
import { ComponentProps, splitProps } from "solid-js";
import { processProps } from "@jundao/design/utilities";
import { IntrinsicComponentProps } from "@jundao/design/types";
import { Link as KobalteLink } from "@kobalte/core";
import { LinkRootOptions } from "@kobalte/core/dist/types/link";

export type LinkProps = IntrinsicComponentProps<
	"a",
	{
		disabled?: boolean;
		type?: "default" | "secondary" | "success" | "warning" | "danger";
	} & Omit<LinkRootOptions, "isDisabled">
>;

export default function Link(props: LinkProps) {
	const [local, others] = processProps({
		props,
		default: {
			preventFocusOnPress: true,
		},
		keys: ["children", "disabled", "type"],
	});

	return (
		<KobalteLink.Root
			class="jdd link"
			classList={{
				secondary: local.type === "secondary",
				success: local.type === "success",
				warning: local.type === "warning",
				danger: local.type === "danger",
			}}
			isDisabled={local.disabled}
			{...others}
		>
			{local.children}
		</KobalteLink.Root>
	);
}
