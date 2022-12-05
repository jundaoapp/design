import "./index.scss";
import { Button } from "@jundao/design";
import { JSX } from "solid-js/types/jsx";
import { ButtonGroupProps } from "@jundao/design/button-group";
import { JSXElement, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { DividerProps } from "@jundao/design/divider";

export type TitleProps = JSX.IntrinsicElements["h1"] & {
	children: JSXElement;
	level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export default function Title(props: TitleProps) {
	const [{ level = 1 }, others] = splitProps(props, ["level"]);

	return (
		<Dynamic component={`h${level}`} class="jdd jdd-typography" {...others} />
	);
}
