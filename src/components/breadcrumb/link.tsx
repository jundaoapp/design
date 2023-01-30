import { Breadcrumbs as KobalteBreadcrumbs } from "@kobalte/core";
import { processProps } from "../utilities";
import { IntrinsicComponentProps } from "../types";

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
		keys: ["current", "disabled", "children"],
	});

	return (
		<KobalteBreadcrumbs.Link
			class="jdd link"
			isCurrent={local.current}
			isDisabled={local.disabled}
			{...others}
		>
			{local.children}
		</KobalteBreadcrumbs.Link>
	);
}
