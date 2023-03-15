import "./index.scss";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";

export type TextProps = IntrinsicComponentProps<
	"span",
	{
		type?: "default" | "secondary" | "success" | "warning" | "danger";
		underline?: boolean;
		delete?: boolean;
		bold?: boolean;
		italic?: boolean;
		mark?: boolean;
		code?: boolean;
		keyboard?: boolean;
		size?: "small" | "default" | "large";
		font?: "sans" | "mono" | "serif";
	}
>;

export function Text(props: TextProps) {
	const [local, others] = processProps({
		props,
		default: {
			type: "default",
			size: "default",
		},
		keys: [
			"children",
			"type",
			"underline",
			"delete",
			"bold",
			"italic",
			"mark",
			"code",
			"keyboard",
			"class",
			"size",
			"font",
		],
	});

	const render = () => {
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
		return child;
	};

	return (
		<span
			class={["jdd text jdd-typography", local.class].join(" ")}
			classList={{
				secondary: local.type === "secondary",
				success: local.type === "success",
				warning: local.type === "warning",
				danger: local.type === "danger",
				small: local.size === "small",
				large: local.size === "large",
				sans: local.font === "sans",
				mono: local.font === "mono",
				serif: local.font === "serif",
			}}
			{...others}
		>
			{render()}
		</span>
	);
}
