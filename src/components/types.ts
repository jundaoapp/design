import { ValidComponent, ComponentProps } from "solid-js";

export type IntrinsicComponentProps<
	Intrinsic extends ValidComponent,
	Props = {},
> = Props & Omit<ComponentProps<Intrinsic>, keyof Props>;
