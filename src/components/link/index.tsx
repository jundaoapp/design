import "./index.scss";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { Link as KobalteLink } from "@kobalte/core";
import { createAutofocus } from "@solid-primitives/autofocus";
import { mergeRefs } from "@solid-primitives/refs";
import { combineProps } from "@solid-primitives/props";

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
		keys: ["disabled", "type", "autofocus"],
	});

	let ref!: HTMLAnchorElement;
	if (local.autofocus) createAutofocus(() => ref);

	const combinedProps = combineProps(others, {
		ref: (el) => (ref = el),
		class: "jdd link",
		get classList() {
			return {
				secondary: local.type === "secondary",
				success: local.type === "success",
				warning: local.type === "warning",
				danger: local.type === "danger",
			};
		},
	});

	return <KobalteLink.Root isDisabled={local.disabled} {...combinedProps} />;
}
