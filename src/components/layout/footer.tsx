import { combineProps } from "@solid-primitives/props";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";

export type LayoutFooterProps = IntrinsicComponentProps<"footer", object>;

export default function LayoutFooter(props: LayoutFooterProps) {
  const [local, others] = processProps({
    props,
    default: {},
    keys: [],
  });

  const combinedProps = combineProps(props, {
    class: "jdd layout-footer",
  });

  return <footer {...combinedProps} />;
}
