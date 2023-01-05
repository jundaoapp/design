import "./index.scss";
import { ComponentProps, splitProps } from "solid-js";
import { processProps } from "@jundao/design/utilities";
import { IntrinsicComponentProps } from "@jundao/design/types";

export type LinkProps = IntrinsicComponentProps<
	"a",
	{
		disabled?: boolean;
		type?: "default" | "secondary" | "success" | "warning" | "danger";
	}
>;

export default function Link(props: LinkProps) {
	const [local, others] = processProps({
		props,
		keys: ["children", "href", "disabled", "type"],
	});

	let hrefProp: { href?: string } = {};

	if (local.disabled !== true) {
		hrefProp.href = local.href;
	}

	return (
		<a
			class="jdd link"
			classList={{
				secondary: local.type === "secondary",
				success: local.type === "success",
				warning: local.type === "warning",
				danger: local.type === "danger",
			}}
			aria-disabled={local.disabled}
			{...hrefProp}
			{...others}
		>
			{local.children}
		</a>
	);
}
