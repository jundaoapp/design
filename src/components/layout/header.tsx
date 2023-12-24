import { combineProps } from "@solid-primitives/props";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";
import "./index.scss";

export type LayoutHeaderProps = IntrinsicComponentProps<"header", object>;

export default function LayoutHeader(props: LayoutHeaderProps) {
  const [local, others] = processProps({
    props,
    default: {},
    keys: [],
  });

  const combinedProps = combineProps(props, {
    class: "jdd layout-header",
  });

  return <header {...combinedProps} />;
}
