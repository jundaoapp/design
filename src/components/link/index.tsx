import "./index.scss";
import { ComponentProps, JSXElement, splitProps } from "solid-js";

export type LinkProps = RequiredChildren<ComponentProps<"a">> & {
	disabled?: boolean;
	type?: "default" | "secondary" | "success" | "warning" | "danger";
};

export default function Link(props: LinkProps) {
	const [local, others] = splitProps(props, [
		"children",
		"href",
		"disabled",
		"type",
	]);

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
			{...hrefProp}
			{...others}
		>
			{local.children}
		</a>
	);
}
