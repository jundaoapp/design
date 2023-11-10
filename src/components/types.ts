import { ComponentProps, ValidComponent } from "solid-js";

export type IntrinsicComponentProps<
	Intrinsic extends ValidComponent,
	Props = object,
> = Props & Omit<ComponentProps<Intrinsic>, keyof Props>;
