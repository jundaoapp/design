import { Link as KobalteLink } from "@kobalte/core";
import { createAutofocus } from "@solid-primitives/autofocus";
import { combineProps } from "@solid-primitives/props";
import { mergeRefs } from "@solid-primitives/refs";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";

export type LinkProps = IntrinsicComponentProps<
	"a",
	{
		type?: "default" | "secondary" | "success" | "warning" | "danger";
		autofocus?: boolean;
	}
>;

export function Link(props: LinkProps) {
	const [local, others] = processProps({
		props,
		keys: ["type", "autofocus"],
	});

	let ref!: HTMLAnchorElement;
	if (local.autofocus) createAutofocus(() => ref);

	const combinedProps = combineProps(others, {
		ref: (el) => {
			ref = el;
		},
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

	return <KobalteLink.Root {...combinedProps} />;
}
