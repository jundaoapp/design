import { ValidComponent, ComponentProps } from "solid-js";

export type IntrinsicComponentProps<
	Intrinsic extends ValidComponent,
	Props = {},
> = Omit<ComponentProps<Intrinsic>, keyof Props> &
	Props & {
		intrinsic?: Partial<ComponentProps<Intrinsic>>;
	};
