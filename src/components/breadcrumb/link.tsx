import "../link/index.scss";
import { Breadcrumbs as KobalteBreadcrumbs } from "@kobalte/core";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";
import { combineProps } from "@solid-primitives/props";

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
		keys: ["current", "disabled"],
	});

	const combinedProps = combineProps(others, {
		class: "jdd link",
	});

	return (
		<KobalteBreadcrumbs.Link
			isCurrent={local.current}
			isDisabled={local.disabled}
			{...combinedProps}
		/>
	);
}
