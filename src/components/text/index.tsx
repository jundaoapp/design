import "./index.scss";
import { JSX } from "solid-js/types/jsx";
import { JSXElement, splitProps } from "solid-js";

export type TextProps = JSX.IntrinsicElements["span"] & {
	children: JSXElement;
	type?: "default" | "secondary" | "success" | "warning" | "danger";
	underline?: boolean;
	delete?: boolean;
	bold?: boolean;
	italic?: boolean;
	mark?: boolean;
	code?: boolean;
	keyboard?: boolean;
};

export default function Text(props: TextProps) {
	const [
		{
			children,
			type = "default",
			underline,
			delete: deleteProp,
			bold,
			italic,
			mark,
			code,
			keyboard,
		},
		others,
	] = splitProps(props, [
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

	let child = children;

	if (underline === true) {
		child = <u class="jdd text">{child}</u>;
	}

	if (deleteProp === true) {
		child = <del class="jdd text">{child}</del>;
	}

	if (bold === true) {
		child = <strong class="jdd text">{child}</strong>;
	}

	if (italic === true) {
		child = <i class="jdd text">{child}</i>;
	}

	if (mark === true) {
		child = <mark class="jdd text">{child}</mark>;
	}

	if (code === true) {
		child = <code class="jdd text">{child}</code>;
	}

	if (keyboard === true) {
		child = <kbd class="jdd text">{child}</kbd>;
	}

	return (
		<span
			class="jdd text jdd-typography"
			classList={{
				secondary: type === "secondary",
				success: type === "success",
				warning: type === "warning",
				danger: type === "danger",
			}}
			{...others}
		>
			{child}
		</span>
	);
}
