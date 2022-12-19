import "./index.scss";
import { ComponentProps, JSXElement, mergeProps, splitProps } from "solid-js";

export type TextProps = ComponentProps<"span"> & {
	type?: "default" | "secondary" | "success" | "warning" | "danger";
	underline?: boolean;
	delete?: boolean;
	bold?: boolean;
	italic?: boolean;
	mark?: boolean;
	code?: boolean;
	keyboard?: boolean;
};

const defaultProps = {
	type: "default",
};

export default function Text(props: TextProps) {
	const [local, others] = splitProps(mergeProps(defaultProps, props), [
		"children",
		"type",
		"underline",
		"delete",
		"bold",
		"italic",
		"mark",
		"code",
		"keyboard",
	]);

	let child = <>{local.children}</>;

	if (local.underline === true) {
		child = <u class="jdd text">{child}</u>;
	}

	if (local.delete === true) {
		child = <del class="jdd text">{child}</del>;
	}

	if (local.bold === true) {
		child = <strong class="jdd text">{child}</strong>;
	}

	if (local.italic === true) {
		child = <i class="jdd text">{child}</i>;
	}

	if (local.mark === true) {
		child = <mark class="jdd text">{child}</mark>;
	}

	if (local.code === true) {
		child = <code class="jdd text">{child}</code>;
	}

	if (local.keyboard === true) {
		child = <kbd class="jdd text">{child}</kbd>;
	}

	return (
		<span
			class="jdd text jdd-typography"
			classList={{
				secondary: local.type === "secondary",
				success: local.type === "success",
				warning: local.type === "warning",
				danger: local.type === "danger",
			}}
			{...others}
		>
			{child}
		</span>
	);
}
