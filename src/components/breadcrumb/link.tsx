import { Breadcrumbs as KobalteBreadcrumbs } from "@kobalte/core";
import { combineProps } from "@solid-primitives/props";
import "../link/index.scss";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";

export type BreadcrumbLinkProps = IntrinsicComponentProps<
	"a",
	{
		current?: boolean;
		disabled?: boolean;
	}
>;

export function BreadcrumbLink(props: BreadcrumbLinkProps) {
	const [local, others] = processProps({
		props,
		keys: [],
	});

	const combinedProps = combineProps(others, {
		class: "jdd link",
	});

	return <KobalteBreadcrumbs.Link {...combinedProps} />;
}
