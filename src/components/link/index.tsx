import "./index.scss";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Link as KobalteLink } from "@kobalte/core";
import { createAutofocus } from "@solid-primitives/autofocus";
import { mergeRefs } from "@solid-primitives/refs";

export type LinkProps = IntrinsicComponentProps<
	"a",
	{
		disabled?: boolean;
		type?: "default" | "secondary" | "success" | "warning" | "danger";
		autofocus?: boolean;
	}
>;

export function Link(props: LinkProps) {
	const [local, others] = processProps({
		props,
		keys: ["children", "disabled", "type", "ref", "autofocus"],
	});

	let ref!: HTMLAnchorElement;
	if (local.autofocus) createAutofocus(() => ref);

	return (
		<KobalteLink.Root
			ref={mergeRefs((el) => (ref = el), local.ref)}
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
