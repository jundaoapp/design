import { As, Button as KobalteButton } from "@kobalte/core";
import { combineProps } from "@solid-primitives/props";
import { IntrinsicComponentProps } from "../types";
import { processProps } from "../utilities";

export type SidenavLinkProps = IntrinsicComponentProps<
	"a" | "button",
	{
		current?: boolean;
		disabled?: boolean;
	}
>;

export default function SidenavLink(props: SidenavLinkProps) {
	const [local, others] = processProps({
		props,
		keys: [
			"children",
			"current",
			"disabled",
			// @ts-ignore
			"href",
		],
	});

	return (
		<li class="jdd sidenav-link" aria-disabled={local.disabled}>
			<KobalteButton.Root asChild>
				{/* @ts-ignore: Can't infer element */}
				<As
					component={Object.hasOwn(local, "href") ? "a" : "button"}
					aria-current={local.current ? "page" : undefined}
					aria-disabled={
						Object.hasOwn(local, "href") ? local.disabled : undefined
					}
					// @ts-ignore
					disabled={Object.hasOwn(local, "href") ? undefined : local.disabled}
					// @ts-ignore
					href={local.disabled ? undefined : local.href}
					{...others}
				>
					{local.children}
				</As>
			</KobalteButton.Root>
		</li>
	);
}
