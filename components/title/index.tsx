import "./index.scss";
import { Button } from "@jundao/design";
import { HTMLAttributes } from "solid-js/types/jsx";
import { ButtonGroupProps } from "@jundao/design/button-group";
import { JSXElement, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
	children: JSXElement,
	level?: 1 | 2 | 3 | 4 | 5 | 6,
}

export default function Title(props: TitleProps) {
	const [{ level = 1 }, others] = splitProps(props, ["level"]);

	return (
		<Dynamic component={`h${level}`} class="jdd jdd-typography" {...others} />
	);
}
